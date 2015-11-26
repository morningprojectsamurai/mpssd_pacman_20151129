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

var Akabei = function (radius, speed, color, pacman, map, row, col) {
    Character.call(this, speed, map, row, col);
    this.radius = radius;
    this.color = color;
    this.pacman = pacman;
};

inheritFromCharacter(Akabei);

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


Akabei.prototype.getBottom = function () {
    return this.getCy() + this.getRadius();
};

Akabei.prototype.decideDirection = function (duration) {
    if (Math.random() < 0.5){
        if (this.pacman.getCx() - this.getCx() < 0){
            this.nextMovingDirection.x = -1;
        } else {
            this.nextMovingDirection.x = 1;
        }
        this.nextMovingDirection.y = 0;
    } else{
        this.nextMovingDirection.x = 0;
        if (this.pacman.getCy() - this.getCy() < 0) {
            this.nextMovingDirection.y = -1;
        }else {
            this.nextMovingDirection.y = 1;
        }
    }
};

Akabei.prototype.move = function (duration) {
    this.decideDirection(duration);
    Character.prototype.move.call(this, duration);
};

Akabei.prototype.killPacman = function() {
    if (this.getDistance(this.pacman) <= Math.max(this.radius, this.pacman.radius)) {
        this.pacman.die();
    }
};

Akabei.prototype.draw = function (ctx) {
    var cx = this.getCx();
    var cy = this.getCy();
    var radius = this.radius;
    var bodyHeight = radius;
    var legHeight = radius / 5 * 2;
    ctx.fillStyle = this.color;
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
    var rightEyeX = cx + 20 * radius / 50;
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