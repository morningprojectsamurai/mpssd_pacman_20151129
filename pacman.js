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
 * Created by Junya Kaneko on 10/23/15.
 * Authors: Junya Kaneko
 */

// パックマンのコンストラクタを定義。
// パックマンは、半径、速度、移動方向、口の開き具合、口パクの速度、初期タイルの位置を属性として持つ。
/**
 * パックマンのコンストラクタ
 * @param radius 半径
 * @param speed 移動スピード(pixcel/s)
 * @param theta 口の開き具合 (度)
 * @param map マップ
 * @param row マップ上の初期位置 (行)
 * @param col マップ上の初期位置 (列)
 * @constructor
 */
var Pacman = function (radius, speed, theta, map, row, col) {
    Character.call(this, speed, map, row, col);
    this.radius = radius;
    this.theta = theta;
    this.dTheta = 3;
};

// Character の prototype を Pacman に設定。
inheritFromCharacter(Pacman);

// パックマンのメソッドを定義。
// 今のところ、メソッドはコンストラクタの持つ prototype オブジェクトのメソッドとして
// 定義すると覚える。
Pacman.prototype.getRadius = function () {
    return this.radius;
};

Pacman.prototype.getLeft = function () {
    return this.getCx() - this.getRadius();
};

Pacman.prototype.getTop = function () {
    return this.getCy() - this.getRadius();
};

Pacman.prototype.getRight = function() {
    return this.getCx() + this.getRadius();
};

Pacman.prototype.getBottom = function() {
    return this.getCy() + this.getRadius();
};

Pacman.prototype.getTheta = function() {
    return this.theta;
};

Pacman.prototype.chew =  function () {
    if (this.theta >= 30 || this.theta <= 0) {
        this.dTheta *= -1;
    }
    this.theta += this.dTheta;
    return this.theta;
};

Pacman.prototype.draw =  function (ctx) {
    ctx.strokeStyle = "#FF0000";
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(this.getCx(), this.getCy(), this.radius, this.getTheta() * Math.PI / 180, (360 - this.getTheta()) * Math.PI / 180);
    ctx.lineTo(this.getCx(), this.getCy());
    ctx.lineTo(this.getCx() + this.radius * Math.cos(this.getTheta() * Math.PI / 180), this.position[1] + this.radius * Math.sin(this.getTheta() * Math.PI / 180));
    ctx.fill();
};