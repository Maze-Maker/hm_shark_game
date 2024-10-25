namespace SpriteKind {
    export const Decoration = SpriteKind.create()
    export const Nuclear_Sub = SpriteKind.create()
    export const Nuclear_Torpedo = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Nuclear_Sub, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 5000)
    info.changeScoreBy(2)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`swim left`,
    200,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.runImageAnimation(
    mySprite,
    assets.animation`swim right`,
    200,
    true
    )
})
info.onCountdownEnd(function () {
    game.over(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeScoreBy(-1)
    info.changeLifeBy(-1)
    for (let index = 0; index < 3; index++) {
        Nuclear_Sub = sprites.create(img`
            ..............fcc...........................................
            ..............fcc...........................................
            ...............ff...........................................
            ...............ff...........................................
            ............11bffffffffffffffffffffffffffffffff.............
            ...........19fb2fff2f2f2f2222f2ff22fff2fff222ffff...........
            .........1199fb22ff2f2f2f2ff2f2ff2fff2f2ff2f2ff4f...........
            ........1999ffb2f2f2f2f2f2ffff2ff22ff222ff222fffffff........
            .......199fbbbb2ff22f2f2f2ff2f2ff2ff2fff2f22ffff44bffff..bb.
            .bb....bbbbbccf2fcc2ff2ff2222f22f22f2fff2f2f2ffccffccf4f..b.
            ...b..f4f4fc91cfc91cffffffffffffffffffffffffffc91cc91c44ffbf
            .bb.bbf444fc99cfc99cf222f2f2f22fffccccccccccccc99cc99c44ffbf
            ...b..f4444fccfffccff2fff2f2f2f2fc999999111111cccffcc44f..b.
            .bb...f44444fffffffff222f2f2f22ffc999999999999cf44444ffc..bb
            .......ff44444444ffffff2f2f2f2f2ffccccccccccccf44ffff.......
            .........fffffffcffff222ff2ff22fffffffffffffffffff..........
            `, SpriteKind.Nuclear_Sub)
        Nuclear_Sub.setPosition(scene.screenWidth(), randint(5, 115))
        Nuclear_Sub.vx = -75
        Nuclear_Sub.setFlag(SpriteFlag.DestroyOnWall, true)
        for (let index = 0; index < 2; index++) {
            Nuclear_Torpedo = sprites.create(assets.image`laser`, SpriteKind.Nuclear_Torpedo)
            Nuclear_Torpedo.setVelocity(-125, randint(-10, 10))
            Nuclear_Torpedo.setPosition(scene.screenWidth(), randint(5, 115))
            Nuclear_Torpedo.setFlag(SpriteFlag.DestroyOnWall, true)
            pause(100)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.confetti, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Nuclear_Torpedo, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 100)
    info.changeScoreBy(-10)
    info.changeLifeBy(-5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.ashes, 1000)
    info.changeScoreBy(2)
})
let MyFood: Sprite = null
let Enemy_Sub: Sprite = null
let Harpoon: Sprite = null
let Nuclear_Torpedo: Sprite = null
let Nuclear_Sub: Sprite = null
let MyDecor: Sprite = null
let mySprite: Sprite = null
info.setLife(20)
scene.setBackgroundColor(8)
scene.setBackgroundImage(assets.image`ocean1`)
mySprite = sprites.create(assets.image`shark`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
info.startCountdown(150)
for (let index = 0; index < 10; index++) {
    MyDecor = sprites.create(assets.image`decoration`, SpriteKind.Decoration)
    MyDecor.setPosition(randint(0, 160), 96)
}
animation.runImageAnimation(
mySprite,
assets.animation`swim right`,
200,
true
)
game.onUpdateInterval(randint(1000, 5000), function () {
    Harpoon = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . 
        . . . . . . b . . . . . . . 
        . . . . b b b . . . . . . . 
        . . . b . . . . . . . . . . 
        . . b . . . . . . . . . . . 
        b b b b b b b b b b f . . . 
        . . b . . . . . . . . f . . 
        . . . b . . . . . . . . f . 
        . . . . b b b . . . . . . f 
        . . . . . . b . . . . . . . 
        . . . . . . . . . . . . . . 
        `, Enemy_Sub, -125, randint(-10, 10))
    Harpoon.setFlag(SpriteFlag.DestroyOnWall, true)
})
game.onUpdateInterval(2100, function () {
    MyFood = sprites.create(assets.image`food`, SpriteKind.Food)
    MyFood.setPosition(scene.screenWidth(), randint(5, 115))
    MyFood.vx = -75
    MyFood.setFlag(SpriteFlag.DestroyOnWall, true)
})
game.onUpdateInterval(2100, function () {
    Enemy_Sub = sprites.create(assets.image`enemy`, SpriteKind.Enemy)
    Enemy_Sub.setPosition(scene.screenWidth(), randint(5, 115))
    Enemy_Sub.vx = -75
    Enemy_Sub.setFlag(SpriteFlag.DestroyOnWall, true)
})
