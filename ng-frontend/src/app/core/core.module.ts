import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './ngxs/app.state';
import { environment } from 'src/environments/environment';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [],
  imports: [
    NgxsModule.forRoot([AppState], {
      developmentMode: !environment.production,
    }),
    NgxsLoggerPluginModule,
    NgxsReduxDevtoolsPluginModule,
  ],
})
export class CoreModule {
  /**
   * Throws an error if a second instance of CoreModule is created
   */
  constructor(@Optional() @SkipSelf() coreModule: CoreModule) {
    if (coreModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
