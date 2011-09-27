package lols.core;

import playn.core.Layer;
import playn.core.SurfaceLayer;

/**
 * @author huljas
 */
public class Ship {

    private float x = 200;
    private float y = 200;
    private float direction = 0;
    private SurfaceLayer layer;

    public Ship(SurfaceLayer layer) {
        this.layer = layer;
    }

    public void update() {
        y += 5;
        direction += 0.1f;
        if (y > 500) {
            y = 0;
        }
    }

    public void draw(float alpha) {
        layer.setRotation(direction);
        layer.setTranslation(x, y);
    }
}
