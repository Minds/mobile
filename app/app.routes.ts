import { TabsComponent } from './src/modules/tabs/tabs.component';
import { ChannelComponent } from './src/modules/channel/channel.component';
import { LoginComponent } from './src/modules/auth/login.component';

export const routes = [
    { path: "", redirectTo: "/login", pathMatch: "full", terminal: true },
    { path: "login", component: LoginComponent },
    { path: "tab/:id", component: TabsComponent },
    { path: "channel/:id", component: ChannelComponent }
];
