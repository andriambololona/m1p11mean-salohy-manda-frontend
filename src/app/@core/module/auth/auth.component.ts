import { Component, OnInit } from '@angular/core';
import { NbLoginComponent, NbAuthResult } from '@nebular/auth';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent  extends NbLoginComponent implements OnInit {
  loading:boolean = false;
  isLoginSuccessfull: boolean = false;
  ngOnInit() {
  }

  login(): void{
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.loading = true;
    this.service.authenticate(this.strategy, {email: this.user.username, password: this.user.password, client_id: environment.client_id}).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.isLoginSuccessfull = true;
        let messg = result.getMessages();
        this.messages = this.convertMessages(messg);
      } else {
        let errs = result.getErrors();
        this.errors = this.convertErrors(errs);
      }
      this.loading = false;
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
      console.log(result);
      console.log(result.getRedirect());
    });
  }

  convertErrors(errors: Array<string> ): Array<string>{
    errors.forEach((element, index) => {
      if (errors[index] == "Something went wrong, please try again."){
        errors[index] = "Une erreur s'est produite. Veuillez contacter l'admnistrateur";
      }
    });
    return errors;
  }

  convertMessages(messages: Array<string> ): Array<string>{
    messages.forEach((element, index) => {
      if (messages[index] == "You have been successfully authenticated."){
        messages[index] = "Authentification éffectuée avec succès.";
      }
    });
    return messages;
  }

  getConfigValue(key: string): any{
    return super.getConfigValue(key);
  }

}
