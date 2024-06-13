import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = 'https://couponapi2.azurewebsites.net/index.php/getUserCoupon';

  private coupons: any[] = [];

  constructor(private http: HttpClient) {}

  setCoupons(coupons: any[]) {
    this.coupons = coupons;
  }

  getUserCoupons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getCouponById(id: string) {
    return this.coupons.find(coupon => coupon.id === id);
  }

  cargarCupon(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?id=${id}`);
  }
}
