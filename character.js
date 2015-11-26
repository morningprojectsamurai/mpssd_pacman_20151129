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

    var leftTop = this.map.getTileLeftTop(row, col);

    // ピクセルベースの移動の描画に必要な情報
    this.position = {
        'x': Math.floor(leftTop.left + this.map.getTileWidth() / 2),
        'y': Math.floor(leftTop.top + this.map.getTileHeight() / 2)
    };
    this.movingDirection = {'x': 0, 'y': 0};
    this.nextMovingDirection = {'x': 0, 'y': 0};
    this.speed = speed;
    this.movingDistance = 0;
};

Character.prototype.toString = function () {
    var str = '';
    str += 'Current position: (' + this.position.x + ', ' + this.position.y + ')\n';
    str += 'Moving direction: (' + this.movingDirection.x + ', ' + this.movingDirection.y + ')\n';
    str += 'Next moving direction: (' + this.nextMovingDirection.x + ', ' + this.nextMovingDirection.y + ')\n';
    str += 'Speed: ' + this.speed + '\n';
    str += 'Moving distance: ' + this.movingDistance + '\n';
    return str;
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
    this.nextMovingDirection = {'x': -1, 'y': 0};
};

Character.prototype.goRight = function () {
    this.nextMovingDirection = {'x': 1, 'y': 0};
};

Character.prototype.goUp = function () {
    this.nextMovingDirection = {'x': 0, 'y': -1};
};

Character.prototype.goDown = function () {
    this.nextMovingDirection = {'x': 0, 'y': 1};
};

Character.prototype.isMovingHorizontally = function () {
    return this.movingDirection.x != 0;
};

Character.prototype.isMovingVertically = function() {
    return this.movingDirection.y != 0;
};

Character.prototype.stops = function() {
    return this.movingDirection.x == 0 && this.movingDirection.y == 0;
};

Character.prototype.isNextMovingDirectionOk = function () {
    console.log('The current tile is ' + this.map.getTile(this.position.x, this.position.y).row + ', ' + this.map.getTile(this.position.x, this.position.y).col + ', ' + this.map.getTile(this.position.x, this.position.y).kind);
    if (this.nextMovingDirection.x < 0){
        console.log('Is the left block a wall? ' + this.map.isLeftBlockWall(this.position.x, this.position.y));
        return !this.map.isLeftBlockWall(this.position.x, this.position.y);
    }else if (this.nextMovingDirection.x > 0) {
        console.log('Is the right block a wall? ' + this.map.isRightBlockWall(this.position.x, this.position.y));
        return !this.map.isRightBlockWall(this.position.x, this.position.y);
    }else if (this.nextMovingDirection.y < 0 ) {
        console.log('Is the above block a wall? ' + this.map.isAboveBlockWall(this.position.x, this.position.y));
        return !this.map.isAboveBlockWall(this.position.x, this.position.y);
    }else if (this.nextMovingDirection.y > 0 ) {
        console.log('Is the below block a wall? ' + this.map.isBelowBlockWall(this.position.x, this.position.y));
        return !this.map.isBelowBlockWall(this.position.x, this.position.y);
    }else{
        return true;
    }
};

Character.prototype.move = function (duration) {
    var arrived = false;
    var distance = duration * this.getSpeed() / 1000;

    if (this.stops()){
        arrived = true;
    } else if (this.isMovingHorizontally()) {
        this.movingDistance += distance;
        if (this.movingDistance >= this.map.getTileWidth()) {
            this.movingDistance = 0;
            arrived = true;
        } else {
            this.position.x += this.movingDirection.x * distance;
        }
    } else if (this.isMovingVertically()){
        this.movingDistance += distance;
        if (this.movingDistance >= this.map.getTileHeight()) {
            this.movingDistance = 0;
            arrived = true;
        } else {
            this.position.y += this.movingDirection.y * distance;
        }
    } else {
        throw 'Unexpected moving.';
    }

    if (arrived) {
        this.position = this.map.getTileCenter(this.position.x, this.position.y);
        if (this.isNextMovingDirectionOk()) {
            console.log('Is next moving direction OK? ' + this.isNextMovingDirectionOk());
            this.movingDirection.x = this.nextMovingDirection.x;
            this.movingDirection.y = this.nextMovingDirection.y;
        }else {
            this.nextMovingDirection.x = this.movingDirection.x;
            this.nextMovingDirection.y = this.movingDirection.y;
            if(!this.isNextMovingDirectionOk()){
                this.movingDirection = {'x': 0, 'y': 0};
            }
        }
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