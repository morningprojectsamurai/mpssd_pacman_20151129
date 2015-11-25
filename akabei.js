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
 * Authors: Yoshida Kurima, Junya Kaneko
 */

var Akabei = function (radius, speed, map, row, col) {
    Character.call(this, speed, map, row, col);
    this.radius = radius;
};

inheritFromCharacter(Akabei);

Akabei.prototype.getCx = function () {
    return this.position.x;
};

Akabei.prototype.getCy = function () {
    return this.position.y;
};

Akabei.prototype.getRadius = function () {
    return this.radius;
};

Akabei.prototype.getLeft = function () {
    return this.getCx() - this.getRadius();
};

Akabei.prototype.getTop = function () {
    return this.getCy() - this.getRadius();
};

Akabei.prototype.getRight = function () {
    return this.getCx() + this.getRadius();
};


Akabei.prototype.getBottom = function() {
    return this.getCy() + this.getRadius();
};

//Akabei.prototype.move = function (pacman) {
//    this.movingDirection.x = this.movingDirection.y = 0;
//    var i = Math.floor(2 * Math.random());
//    if (pacman.getPosition(i) - this.position[i] != 0) {
//        this.movingDirection[i] = (pacman.getPosition(i) - this.position[i]) / Math.abs(pacman.getPosition(i) - this.position[i]);
//        this.position[i] += this.getSpeed() * this.movingDirection[i];
//    }
//};

Akabei.prototype.draw = function (ctx) {
    var cx = this.getCx();
    var cy = this.getCy();
    var radius = this.radius;
    var bodyHeight = radius;
    var legHeight = radius / 5 * 2;
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy);
    ctx.arc(cx, cy, radius, Math.PI, 2 * Math.PI);
    ctx.lineTo(cx + radius, cy + bodyHeight);
    ctx.lineTo(cx + radius / 3 * 2, cy + bodyHeight - legHeight);
    ctx.lineTo(cx + radius / 3, cy + bodyHeight);
    ctx.lineTo(cx, cy + bodyHeight - legHeight);
    ctx.lineTo(cx - radius / 3, cy + bodyHeight);
    ctx.lineTo(cx - radius / 3 * 2, cy + bodyHeight - legHeight);
    ctx.lineTo(cx - radius, cy + bodyHeight);
    ctx.lineTo(cx - radius, cy);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    var leftEyeX = cx - 20 * radius / 50;
    var leftEyeY = cy - 4 * radius / 50;
    var rightEyeX  = cx + 20 * radius / 50;
    var rightEyeY = cy - 4 * radius / 50;
    ctx.beginPath();
    ctx.arc(leftEyeX, leftEyeY, 16 * radius / 50, 0, Math.PI * 2);
    ctx.arc(rightEyeX, rightEyeY, 16 * radius / 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0000FF';
    ctx.beginPath();
    ctx.arc(leftEyeX - 8 * radius / 50, leftEyeY - 4 * radius / 50, 7 * radius / 50, 0, Math.PI * 2);
    ctx.arc(rightEyeX - 8 * radius / 50, rightEyeY - 4 * radius / 50, 7 * radius / 50, 0, Math.PI * 2);
    ctx.fill();
};