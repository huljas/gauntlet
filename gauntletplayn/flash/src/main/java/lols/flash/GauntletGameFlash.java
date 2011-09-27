package lols.flash;

import playn.core.PlayN;
import playn.flash.FlashGame;
import playn.flash.FlashPlatform;

import lols.core.GauntletGame;

public class GauntletGameFlash extends FlashGame {

  @Override
  public void start() {
    FlashPlatform platform = FlashPlatform.register();
    platform.assetManager().setPathPrefix("gauntletplaynflash/");
    PlayN.run(new GauntletGame());
  }
}
