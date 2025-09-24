import dotenv from 'dotenv';
import path from 'path';
import app from './config/app';
import { checkoutPlan } from './scripts/checkoutPlan';

dotenv.config({
  path: path.resolve('.env'),
});

const port = process.env.PORT || 4000;

async function startServer() {
  try {
    await checkoutPlan();

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(`Erro ao iniciar o servidor na porta: `, error);
    process.exit(1);
  }
}

startServer();
