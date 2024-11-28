// src/server.js

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Endpoint para listar todos os clientes
app.get('/clientes', async (req, res) => {
  const clientes = await prisma.cliente.findMany();
  res.json(clientes);
});

app.post('/clientes', async (req, res) => {
  const { nome, nomeSocial, cpf, rg, telefone, genero } = req.body;

  if (!nome || !cpf || !rg || !telefone || !genero) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const cliente = await prisma.cliente.create({
      data: {
        nome,
        nomeSocial,
        cpf,
        rg,
        telefone,
        genero
      }
    });
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});


// Endpoint para deletar um cliente
app.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.cliente.delete({
      where: { id: Number(id) }
    });
    res.status(204).send(); // Resposta de sucesso sem conteúdo
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

// Endpoint para editar um cliente
app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, nomeSocial, cpf, rg, telefone } = req.body;

  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: {
        nome,
        nomeSocial,
        cpf,
        rg,
        telefone
      }
    });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar cliente' });
  }
});

// Endpoint para listar todos os produtos
app.get('/produtos', async (req, res) => {
  const produtos = await prisma.produto.findMany();
  res.json(produtos);
});

// Endpoint para criar um novo produto
app.post('/produtos', async (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const produto = await prisma.produto.create({
    data: {
      nome,
      preco,
      quantidade
    }
  });
  res.json(produto);
});

// Editar produto
app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome, preço e quantidade são obrigatórios.' });
  }

  const precoNumerico = parseFloat(preco.replace(',', '.'));

  if (isNaN(precoNumerico)) {
    return res.status(400).json({ error: 'Preço inválido. Certifique-se de fornecer um valor numérico.' });
  }

  try {
    const produtoExistente = await prisma.produto.findUnique({
      where: { id: Number(id) }
    });

    if (!produtoExistente) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(id) },
      data: { nome, preco: precoNumerico }
    });

    res.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro completo:', error); // Log detalhado para depuração
    res.status(500).json({ error: 'Erro ao editar produto', details: error.message });
  }
});

// Deletar produto
app.delete('/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.produto.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

// Endpoint para listar todos os serviços
app.get('/servicos', async (req, res) => {
  const servicos = await prisma.servico.findMany();
  res.json(servicos);
});

// Editar serviço
app.put('/servicos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ error: 'Nome e preço são obrigatórios.' });
  }

  const precoNumerico = parseFloat(preco.replace(',', '.'));

  if (isNaN(precoNumerico)) {
    return res.status(400).json({ error: 'Preço inválido. Certifique-se de fornecer um valor numérico.' });
  }

  try {
    const servicoExistente = await prisma.servico.findUnique({
      where: { id: Number(id) }
    });

    if (!servicoExistente) {
      return res.status(404).json({ error: 'Serviço não encontrado' });
    }

    const servicoAtualizado = await prisma.servico.update({
      where: { id: Number(id) },
      data: { nome, preco: precoNumerico }
    });

    res.json(servicoAtualizado);
  } catch (error) {
    console.error('Erro completo:', error); // Log detalhado para depuração
    res.status(500).json({ error: 'Erro ao editar serviço', details: error.message });
  }
});

// Deletar serviço
app.delete('/servicos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.servico.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
});

// Endpoint para criar um novo serviço
app.post('/servicos', async (req, res) => {
  const { nome, preco, quantidade } = req.body;
  const servico = await prisma.servico.create({
    data: {
      nome,
      preco,
      quantidade
    }
  });
  res.json(servico);
});

// Endpoint para registrar consumo de produtos e serviços
app.post('/consumo', async (req, res) => {
  const { clienteId, itens } = req.body;

  // Validação simples para garantir que itens estão presentes
  if (!itens || itens.length === 0) {
    return res.status(400).json({ error: 'Deve ser fornecido pelo menos um item' });
  }

  try {
    const consumosCriados = [];
    let totalCliente = 0;
    let quantidadeTotalCliente = 0;

    for (let item of itens) {
      const { itemId, tipo, quantidade, total } = item;

      // Verifica se tipo é válido
      if (tipo !== 'produto' && tipo !== 'servico') {
        return res.status(400).json({ error: 'Tipo inválido. Deve ser "produto" ou "servico".' });
      }

      // Verifica se o produto ou serviço existe
      let produtoOuServico;
      if (tipo === 'produto') {
        produtoOuServico = await prisma.produto.findUnique({
          where: { id: itemId }
        });
      } else if (tipo === 'servico') {
        produtoOuServico = await prisma.servico.findUnique({
          where: { id: itemId }
        });
      }

      if (!produtoOuServico) {
        return res.status(400).json({ error: `${tipo} não encontrado no banco de dados.` });
      }
      // Criação do consumo
      const consumoCriado = await prisma.consumo.create({
        data: {
          clienteId,
          tipo,
          produtoId: tipo === 'produto' ? itemId : null,
          servicoId: tipo === 'servico' ? itemId : null,
          quantidade,
          total,  // Certifique-se de que o valor de 'total' é calculado corretamente
        },
      });


      consumosCriados.push(consumoCriado);

      // Calculando o total do cliente (quantidade e total consumido)
      totalCliente += total;
      quantidadeTotalCliente += quantidade;
    }

    // Agora você pode retornar o total do cliente com as quantidades
    res.status(201).json({
      message: 'Consumos criados com sucesso',
      consumos: consumosCriados,
      totalCliente,
      quantidadeTotalCliente,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar consumo' });
  }
});


// Novo Endpoint para listar todos os gêneros
app.get('/generos', async (req, res) => {
  const generos = await prisma.genero.findMany();
  res.json(generos);
});

// Novo Endpoint para criar um novo gênero
app.post('/generos', async (req, res) => {
  const { nome } = req.body;
  const genero = await prisma.genero.create({
    data: {
      nome
    }
  });
  res.json(genero);
});

// Novo Endpoint para editar um gênero
app.put('/generos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const genero = await prisma.genero.update({
      where: { id: Number(id) },
      data: { nome }
    });
    res.json(genero);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao editar gênero' });
  }
});

// Novo Endpoint para deletar um gênero
app.delete('/generos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.genero.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar gênero' });
  }
});

app.get('/clientes/mais-consumidos', async (req, res) => {
  try {
    // Buscar todos os clientes e seus consumos associados
    const clientes = await prisma.cliente.findMany({
      include: {
        consumos: {
          select: {
            quantidade: true,
            produtoId: true, // Inclui o produto se o consumo for de produto
            servicoId: true, // Inclui o serviço se o consumo for de serviço
          },
        },
      },
    });

    // Agora, vamos calcular a quantidade total consumida por cada cliente
    const clientesMaisConsumidos = clientes.map((cliente) => {
      // Soma a quantidade de consumo
      const totalConsumido = cliente.consumos.reduce((acc, consumo) => {
        return acc + consumo.quantidade;
      }, 0);

      return {
        ...cliente,
        totalConsumido,
      };
    });

    // Ordenar os clientes por quantidade consumida (do maior para o menor)
    const clientesOrdenados = clientesMaisConsumidos.sort((a, b) => b.totalConsumido - a.totalConsumido);

    // Retornar os clientes ordenados e com a quantidade total consumida
    res.json(clientesOrdenados);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

app.get('/clientes/por-genero', async (req, res) => {
  try {
    const clientesPorGenero = await prisma.cliente.findMany({
      orderBy: {
        genero: 'asc'
      }
    });
    res.json(clientesPorGenero);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar clientes por gênero');
  }
});


app.get('/produtos-servicos/mais-consumidos', async (req, res) => {
  try {
    const produtosMaisConsumidos = await prisma.produto.findMany({
      include: {
        consumos: true
      },
      orderBy: {
        quantidade: 'desc'
      },
      take: 10
    });

    const servicosMaisConsumidos = await prisma.servico.findMany({
      include: {
        consumos: true
      },
      orderBy: {
        quantidade: 'desc'
      },
      take: 10
    });

    res.json({ produtos: produtosMaisConsumidos, servicos: servicosMaisConsumidos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar produtos ou serviços mais consumidos');
  }
});


app.get('/produtos-servicos/por-genero', async (req, res) => {
  try {
    const produtosServicosPorGenero = await prisma.cliente.findMany({
      include: {
        consumos: {
          select: {
            produto: true,
            servico: true,
            quantidade: true
          }
        }
      }
    });

    const consumoPorGenero = produtosServicosPorGenero.map(cliente => ({
      genero: cliente.genero,
      consumos: cliente.consumos
    }));

    res.json(consumoPorGenero);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar dados de produtos/serviços por gênero');
  }
});


app.get('/clientes/menos-consumidos', async (req, res) => {
  try {
    const clientesMenosConsumidos = await prisma.cliente.findMany({
      include: {
        consumos: {
          select: {
            quantidade: true
          }
        }
      }
    });

    // Calcula o total consumido por cliente
    const clientesOrdenados = clientesMenosConsumidos
      .map(cliente => ({
        ...cliente,
        total_consumo: cliente.consumos.reduce((total, consumo) => total + consumo.quantidade, 0) // Soma os consumos
      }))
      .sort((a, b) => a.total_consumo - b.total_consumo) // Ordena pela quantidade consumida
      .slice(0, 10); // Retorna os 10 primeiros

    res.json(clientesOrdenados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar clientes menos consumidos');
  }
});




app.get('/clientes/mais-consumidos-valor', async (req, res) => {
  try {
    const clientesMaisConsumidosValor = await prisma.cliente.findMany({
      include: {
        consumos: {
          select: {
            produto: true,
            servico: true,
            total: true
          }
        }
      }
    });

    // Calcular o total consumido por cliente
    const clientesComTotais = clientesMaisConsumidosValor.map(cliente => {
      const totalConsumo = cliente.consumos.reduce((sum, consumo) => sum + consumo.total, 0);
      return {
        ...cliente,
        totalConsumo
      };
    });

    // Ordenar por total consumido em valor
    clientesComTotais.sort((a, b) => b.totalConsumo - a.totalConsumo);

    // Pegar os 5 primeiros clientes
    const topClientes = clientesComTotais.slice(0, 5);

    res.json(topClientes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar clientes mais consumidos em valor');
  }
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
