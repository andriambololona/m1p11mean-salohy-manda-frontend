import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { AccessControlProviderService } from './access-control-provider.service';

@Injectable()
export class CustomAccessChecker{
    constructor( protected accessControlProviderService: AccessControlProviderService) {
        //super(roleProvider, acl);
    }
    /*isGranted(permission: string, resource: string): Observable<boolean> {
        return this.accessControlProviderService.getAccess().pipe(
            map((x: any) => {
               // console.log("permission:",permission,resource);
                if(!x[permission]){
                    return false
                }
                else if (x[permission].includes(resource)) {
                    return true
                }
                else {
                   return false
                }
            }))
    }*/
}
