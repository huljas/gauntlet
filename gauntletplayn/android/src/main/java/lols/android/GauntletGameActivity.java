package lols.android;

import playn.android.GameActivity;
import playn.core.PlayN;

import lols.core.GauntletGame;

public class GauntletGameActivity extends GameActivity {

  @Override
  public void main(){
    platform().assetManager().setPathPrefix("lols/resources");
    PlayN.run(new GauntletGame());
  }
}
