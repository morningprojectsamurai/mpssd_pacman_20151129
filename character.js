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
 * キャラクタが共通して持つべき機能 (method) を定義。
 * getLeft, getRight, getTop, getBottom, draw は、それぞれのキャラクタに合わせてオーバーライドすること。
 * @type {{getLeft: Function, getRight: Function, getTop: Function, getBottom: Function, getSpeed: Function, goLeft: Function, goRight: Function, goUp: Function, goDown: Function, isInWall: Function, move: Function, draw: Function}}
 */
Character.prototype = {
    getLeft: function () {
        throw 'getLeft method must be overridden.';
    },

    getRight: function () {
        throw 'getRight method must be overridden.';
    },

    getTop: function () {
        throw 'getTop method must be overridden.';
    },

    getBottom: function () {
        throw 'getBottom method must be overridden.';
    },

    getSpeed: function () {
        return this.speed;
    },

    goLeft: function () {
        this.movingDirection = {'x': -1, 'y': 0};
    },

    goRight: function () {
        this.movingDirection = {'x': 1, 'y': 0};
    },

    goUp: function () {
        this.movingDirection = {'x': 0, 'y': -1};
    },

    goDown: function () {
        this.movingDirection = {'x': 0, 'y': 1};
    },

    isInWall: function () {
        return this.map.isWall(this.getLeft(), this.getTop()) ||
            this.map.isWall(this.getLeft(), this.getBottom()) ||
            this.map.isWall(this.getRight(), this.getTop()) ||
            this.map.isWall(this.getRight(), this.getBottom())
    },

    move: function (duration) {
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
    },

    draw: function (ctx) {
        throw 'draw method must be overridden.';
    }
};

var inheritFromCharacter = function (childClass) {
    var tempConstructor = function(){};
    tempConstructor.prototype = Character.prototype;
    childClass.prototype = new tempConstructor();
    childClass.prototype.constructor = childClass;
};