/**
 * This file is part of "MPS Setagaya Pacman."
 *
 * MPS Setagaya Pacman is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MPS Setagaya Pacman is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 *
 * (c) Junya Kaneko <jyuneko@hotmail.com>
 */

/**
 * Created by Junya Kaneko on 11/25/15.
 * Authors: Junya Kaneko
 */

/**
 * キャラクタを表現するオブジェクトのコンストラクタ。
 * キャラクタが共通に持つ性質 (properties) を定義。
 * @param speed 移動スピード (pixcel/s)
 * @param map マップ
 * @param row マップ上の初期位置 (行)
 * @param col マップ上の初期位置 (列)
 * @constructor
 */
var Character = function (speed, map, row, col) {
    // タイルベースの移動に必要な情報
    this.map = map;

    var rect = this.map.getTilePosition(row, col);

    // ピクセルベースの移動の描画に必要な情報
    this.position = {
        'x': Math.floor(rect.left + this.map.getTileWidth() / 2),
        'y': Math.floor(rect.top + this.map.getTileHeight() / 2)
    };
    this.movingDirection = {'x': 0, 'y': 0};
    this.speed = speed;
};

/**
 * キャラクタの左端の座標 (Pixcel)を返す。
 * 必ずキャラクタ毎にオーバーライドすること。
 * @method getLeft
 */
Character.prototype.getLeft = function () {
    throw 'getLeft method must be overridden.';
};

/**
 * キャラクタの右端の座標 (Pixcel)を返す。
 * 必ずキャラクタ毎にオーバーライドすること。
 * @method getRight
 */
Character.prototype.getRight = function () {
    throw 'getRight method must be overridden.';
};

/**
 * キャラクタの上端の座標 (Pixcel)を返す。
 * 必ずキャラクタ毎にオーバーライドすること。
 * @method getTop
 */
Character.prototype.getTop = function () {
    throw 'getTop method must be overridden.';
};

/**
 * キャラクタの下端の座標 (Pixcel)を返す。
 * 必ずキャラクタ毎にオーバーライドすること。
 * @method getBottom
 */
Character.prototype.getBottom = function () {
    throw 'getBottom method must be overridden.';
};

Character.prototype.getSpeed = function () {
    return this.speed;
};

Character.prototype.goLeft = function () {
    this.movingDirection = {'x': -1, 'y': 0};
};

Character.prototype.goRight = function () {
    this.movingDirection = {'x': 1, 'y': 0};
};

Character.prototype.goUp = function () {
    this.movingDirection = {'x': 0, 'y': -1};
};

Character.prototype.goDown = function () {
    this.movingDirection = {'x': 0, 'y': 1};
};

Character.prototype.isInWall = function () {
    return this.map.isWall(this.getLeft(), this.getTop()) ||
        this.map.isWall(this.getLeft(), this.getBottom()) ||
        this.map.isWall(this.getRight(), this.getTop()) ||
        this.map.isWall(this.getRight(), this.getBottom())
};

Character.prototype.move = function (duration) {
    var previous_pos_x = this.position.x;
    var previous_pos_y = this.position.y;

    this.position.x += (this.movingDirection.x * duration * this.getSpeed() / 1000);

    if (this.isInWall()) {
        this.position.x = previous_pos_x;
    }

    this.position.y += (this.movingDirection.y * duration * this.getSpeed() / 1000);

    if (this.isInWall()) {
        this.position.y = previous_pos_y;
    }
};

/**
 * キャラクタを描画する。
 * 必ずキャラクタ毎にオーバーライドすること。
 * @method draw
 */
Character.prototype.draw = function (ctx) {
    throw 'draw method must be overridden.';
};

/**
 * Character のプロトタイプを子クラスに継承させるための処理を行う関数。
 * @param childClass 作成する子クラス
 */
var inheritFromCharacter = function (childClass) {
    var tempConstructor = function () {
    };
    tempConstructor.prototype = Character.prototype;
    childClass.prototype = new tempConstructor();
    childClass.prototype.constructor = childClass;
};