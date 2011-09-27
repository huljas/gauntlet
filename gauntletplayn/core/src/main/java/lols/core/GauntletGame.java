package lols.core;

import static playn.core.PlayN.*;

import playn.core.*;

public class GauntletGame implements Game {

    private Ship ship;

    @Override
    public void init() {
        // create and add background image layer
        GroupLayer base = graphics().createGroupLayer();
        Image bgImage = assetManager().getImage("images/bg.png");
        ImageLayer bgLayer = graphics().createImageLayer(bgImage);
        Font font = graphics().createFont("Arial", Font.Style.BOLD, 15.0f);
        TextFormat format = new TextFormat().withFont(font);
        TextLayout layout = graphics().layoutText("Gauntlet Ze Gameh!", format.withTextColor(0xFF660000));
        CanvasLayer layer = graphics().createCanvasLayer(400, 400);
        layer.canvas().drawText(layout, 0, 0);
        base.add(bgLayer);
        base.add(layer);
        Image shipImage = assetManager().getImage("images/ship.png");
        SurfaceLayer shipLayer = graphics().createSurfaceLayer(shipImage.width(), shipImage.height());
        shipLayer.surface().drawImage(shipImage, 0, 0);
        base.add(shipLayer);
        ship = new Ship(shipLayer);
        graphics().rootLayer().add(base);
    }

    @Override
    public void paint(float alpha) {
        ship.draw(alpha);
    }

    @Override
    public void update(float delta) {
        ship.update();
    }

    @Override
    public int updateRate() {
        return 20;
    }
}
