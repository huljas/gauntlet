package lols.html;

import playn.core.PlayN;
import playn.html.HtmlGame;
import playn.html.HtmlPlatform;

import lols.core.GauntletGame;

public class GauntletGameHtml extends HtmlGame {

  @Override
  public void start() {
    HtmlPlatform platform = HtmlPlatform.register();
    platform.assetManager().setPathPrefix("gauntletplayn/");
    PlayN.run(new GauntletGame());
  }
}
