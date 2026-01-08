import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import {Provider} from "react-redux";
import {store} from "~/redux/store";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </div>
  );
};

export default api.withTRPC(MyApp);
