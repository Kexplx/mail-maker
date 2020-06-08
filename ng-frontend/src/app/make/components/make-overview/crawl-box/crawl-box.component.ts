import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/core/models/enums/provider.enum';
import { Store, Select } from '@ngxs/store';
import { Crawl } from 'src/app/core/ngxs/app.actions';
import { AppState } from 'src/app/core/ngxs/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crawl-box',
  templateUrl: './crawl-box.component.html',
  styleUrls: ['./crawl-box.component.scss'],
})
export class CrawlBoxComponent implements OnInit {
  @Select(AppState.crawlLoading) crawlLoading$: Observable<boolean>;
  @Select(AppState.crawlFailed) crawlFailed$: Observable<boolean>;

  selectedProvider: Provider;

  constructor(private store: Store) {}

  ngOnInit() {
    this.selectedProvider = Provider.WEBDE;
  }

  onSubmit() {
    this.store.dispatch(new Crawl(this.selectedProvider));
  }
}
