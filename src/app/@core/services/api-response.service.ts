import { Injectable } from '@angular/core';
import { ApiResponseCodeEnum } from '../enums/api-response-code.enum';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class ApiResponseService {
    constructor(private toastrService: NbToastrService) { }
    showNotificationByErrorCode(code: ApiResponseCodeEnum) {
        switch (code) {
            case ApiResponseCodeEnum.BAD_REQUEST: this.toastrService.danger('Un ou plusieurs des informations renseignées sont invalides.');
                break;
            case ApiResponseCodeEnum.UNAUTHORIZED: this.toastrService.danger("Vous devez vous authentifier pour acceder la ressource.Veuillez contacter l'administrateur");
                break;
            case ApiResponseCodeEnum.FORBIDDEN: this.toastrService.danger("Accès non authorisé.Veuillez contacter l'administrateur");
                break;
            default: this.toastrService.danger("Erreur interne du serveur.Veuillez contacter l'administrateur");
                break;
        }

    }


    showNotificationBySuccesCode(message: string = null, code: ApiResponseCodeEnum) {
        switch (code) {
            case ApiResponseCodeEnum.ACCEPTED: {
                if (message == null) {
                    message = 'impossible de traiter votre requête.'
                }
                this.toastrService.warning(message);
            }
                break;
            default: {
                if (message == null) {
                    message = 'Requête traitée avec succès.'
                }
                this.toastrService.success(message);
            }
                break;
        }
    }
}
