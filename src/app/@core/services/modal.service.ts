import { Injectable } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { OtherPhoneNumberComponent } from "../../pages/client/client-table/agent-phone/other-phone-number/other-phone-number.component";

@Injectable()
export class ModalService {
    constructor(private dialogService: NbDialogService) { }

    openOtherPhoneView(context:any){
        return this.openModal(OtherPhoneNumberComponent,context) 
    }

    openModal(component: any, context: any) {
        const modalRef: any = this.dialogService.open(
            component,
            {
                context: { context },
                closeOnBackdropClick: true,
            });
        return new Promise<boolean>((resolve, reject) => modalRef.componentRef.instance.response.subscribe(
            response => resolve(response)
        ));
    }

}