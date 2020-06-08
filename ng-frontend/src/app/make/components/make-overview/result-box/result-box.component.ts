import { Component } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Select } from '@ngxs/store';
import { AppState } from 'src/app/core/ngxs/app.state';
import { Observable } from 'rxjs';
import { Result } from 'src/app/core/models/result.model';

@Component({
  selector: 'app-result-box',
  templateUrl: './result-box.component.html',
  styleUrls: ['./result-box.component.scss'],
})
export class ResultBoxComponent {
  @Select(AppState.result) result$: Observable<Result>;

  constructor(private toastrService: NbToastrService) {}

  copyToClipboard(text: string) {
    const input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  showToast(message: string) {
    this.toastrService.show(`${message} copied.`, 'Success!', { icon: 'clipboard-outline' });
  }
}
