import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";

export const WeddingApp = () => {
  return (
    <>
      <AppTheme>
        <AppRouter />
      </AppTheme>
    </>
  );
};
