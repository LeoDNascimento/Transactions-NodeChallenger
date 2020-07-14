import { Router } from 'express';

import CreateTransactionsService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

/**
 * [x] Uma rota post que receba 'title, value e type' no body
 *     ° Type é o tipo da transação = income (depósitos) e outcome (retiradas)
 * [x] Criar uma rota get para listar todas as transações cadastradas
 * [ ] Retornar junto do valor um balanço
 *     ° Soma das entradas, retiradas e total restante
 */

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionsService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
