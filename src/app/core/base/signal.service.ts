// import { Injectable } from "@angular/core";
// import { catchError, map, Observable, of } from "rxjs";
// import { IResponseData } from "../response/response-data";
// import { toSignal } from "@angular/core/rxjs-interop";

// @Injectable()

// export class SignalService {
//     public toSignal<T>(observable: Observable<IResponseData<T>>) {
//         return toSignal(
//           observable.pipe(
//             map((data) => data.dataList),
//             catchError(() => of([])),
//           ),
//           {
//             initialValue: [],
//           },
//         );
//     }
// }
