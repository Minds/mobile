import { TabsComponent } from './modules/tabs/tabs.component';
import { NewsfeedSingleComponent } from './modules/newsfeed/single.component';
import { ChannelComponent } from './modules/channel/channel.component';
import { LoginComponent } from './modules/auth/login.component';

export const routes = [
    { path: "", redirectTo: "/login", pathMatch: "full", terminal: true },
    { path: "login", component: LoginComponent },
    { path: "tab/:id", component: TabsComponent },
    { path: "newsfeed/:id", component: NewsfeedSingleComponent },
    { path: "channel/:id", component: ChannelComponent }
];
