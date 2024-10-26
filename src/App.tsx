import { RouterProvider } from 'react-router-dom';
import router from './Router';
import RQProvider from './components/ReactQueryProvider';
import LoadingScreen from './components/LoadingScreen';
import { Analytics } from '@vercel/analytics/react';
// import { useEffect } from 'react';

function App() {
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: 'en',
  //       autoDisplay: false,
  //     },
  //     'google_translate_element',
  //   );
  // };
  // useEffect(() => {
  //   const addScript = document.createElement('script');
  //   addScript.setAttribute(
  //     'src',
  //     '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit',
  //   );
  //   document.body.appendChild(addScript);
  //   window.googleTranslateElementInit = googleTranslateElementInit;
  // }, []);
  return (
    <RQProvider>
      <div id="google_translate_element">
        <RouterProvider router={router} />
        <LoadingScreen />
        <Analytics />
      </div>
    </RQProvider>
  );
}

export default App;
