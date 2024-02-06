import { NgModule } from '@angular/core';
import { ThemeModule } from '../../../@theme/theme.module';
import { InputModalService } from '../../services/input-modal.service';
import { InputMessageModalComponent } from './input-message-modal/input-message-modal.component';
import { FormsModule } from '@angular/forms';
import { TextareaInputMessageModalComponent } from './textarea-input-message-modal/textarea-input-message-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
  ],
  declarations: [InputMessageModalComponent, TextareaInputMessageModalComponent],
  entryComponents: [InputMessageModalComponent, TextareaInputMessageModalComponent],
})
export class InputModalModule{
}
