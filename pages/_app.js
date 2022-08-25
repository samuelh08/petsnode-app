import '../styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Bar from '../components/Bar';
import { UserProvider } from '../context/user';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <Bar />
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
}

export default MyApp;
