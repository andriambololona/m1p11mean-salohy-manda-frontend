import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class RouteHelper {
    constructor(private _router: Router) { }

    //RELOAD PAGE
    reloadPage() {
        let currentUrl = this._router.url;
        this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this._router.navigate([currentUrl]);
        });
    }
}