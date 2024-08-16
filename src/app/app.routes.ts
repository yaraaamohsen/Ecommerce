import { Routes } from '@angular/router';
import { LoginComponent } from './layout/pages/login/login.component';
import { HomeComponent } from './layout/pages/home/home.component';
import { CartComponent } from './layout/pages/cart/cart.component';
import { ProductsComponent } from './layout/pages/products/products.component';
import { BrandsComponent } from './layout/pages/brands/brands.component';
import { CategoriesComponent } from './layout/pages/categories/categories.component';
import { NotfoundComponent } from './layout/addition/notfound/notfound.component';
import { RegisterComponent } from './layout/pages/register/register.component';
import { authGuard } from './shared/guard/auth.guard';
import { EmailVerifyComponent } from './layout/addition/email-verify/email-verify.component';
import { CodeVerifyComponent } from './layout/addition/code-verify/code-verify.component';
import { ResetPasswordComponent } from './layout/addition/reset-password/reset-password.component';
import { ProductDetailsComponent } from './layout/addition/product-details/product-details.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login' , pathMatch: 'full'},
    {path: 'login' , component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'emailVerify', component: EmailVerifyComponent},
    {path: 'codeVerify', component: CodeVerifyComponent},
    {path: 'resetPassword', component: ResetPasswordComponent},
    {path: 'productDetails/:pId', component: ProductDetailsComponent , canActivate : [authGuard]},
    {path:'home', component: HomeComponent, canActivate : [authGuard]},
    {path: 'cart', component: CartComponent, canActivate : [authGuard]},
    {path: 'products', component: ProductsComponent , canActivate : [authGuard]},
    {path: 'brands', component: BrandsComponent, canActivate : [authGuard]},
    {path: 'categories', component: CategoriesComponent, canActivate : [authGuard]},
    {path:'**', component: NotfoundComponent}
];
