import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Pipe({
  name: "moneyFormat",
})
@Injectable({
  providedIn: "root",
})

export class MoneyFormatPipe extends DecimalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === "number") {
        const step1 = value.toFixed(2);
      if (!step1.split(".")[1].startsWith("0")) {
        return this.addCommas(step1.split(".")[0] + "." + step1.split(".")[1]);
      } 
      else {
        return this.addCommas(step1.split(".")[0]);
      }
    } else {
      return "";
    }
  }

  addCommas(nStr:string) {
    nStr += "";
    const x = nStr.split(".");
    let x1 = x[0];
    const x2 = x.length > 1 ? "." + x[1] : "";
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + " " + "$2");
    }
    return x1 + x2;
  }
}
