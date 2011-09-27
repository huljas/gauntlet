package lols.java;

import playn.core.PlayN;
import playn.java.JavaPlatform;

import lols.core.GauntletGame;

public class GauntletGameJava {

  public static void main(String[] args) {
    JavaPlatform platform = JavaPlatform.register();
    platform.assetManager().setPathPrefix("src/main/java/lols/resources");
    PlayN.run(new GauntletGame());
  }
}
