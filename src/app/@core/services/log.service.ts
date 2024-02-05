import { GetTableDataParam } from '../entity/get-table-data-param';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Datatable } from '../entity/data-table';
import { AppLog } from '../entity/applog';
import { SysLog } from '../entity/syslog';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class LogService{
    abstract deleteAll(showErrorNotif:boolean): Observable<HttpResponse<boolean> | Observable<never>>;
    abstract getAppLog(showErrorNotif:boolean, getTableDataParam: GetTableDataParam): Observable<HttpResponse<Datatable<Array<AppLog>>> | Observable<never>>;
    abstract getSysLog(showErrorNotif:boolean, getTableDataParam: GetTableDataParam): Observable<HttpResponse<Datatable<Array<SysLog>>> | Observable<never>>;
}
