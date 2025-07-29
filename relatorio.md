<sup>Suas cotas de feedback AI acabaram, o sistema de feedback voltou ao padrão.</sup>

# 🧪 Relatório de Avaliação – Journey Levty Etapa 1 - BernardoRSP

**Data:** 29/07/2025 21:31

**Nota Final:** `52.13/100`
**Status:** ❌ Reprovado

---
## ✅ Requisitos Obrigatórios
- Foram encontrados `7` problemas nos requisitos obrigatórios. Veja abaixo os testes que falharam:
  - ⚠️ **Falhou no teste**: `CREATE: Recebe status code 400 ao tentar criar agente com payload em formato incorreto`
    - **Melhoria sugerida**: Seu endpoint de criação de agentes (`POST /agentes`) não está validando payloads incorretos. O teste enviou dados inválidos e esperava um status `400 Bad Request`, mas recebeu outro. Implemente uma validação robusta para os dados de entrada.
  - ⚠️ **Falhou no teste**: `READ: Recebe status 404 ao tentar buscar um agente inexistente`
    - **Melhoria sugerida**: Ao tentar buscar um agente com ID inexistente (`GET /agentes/:id`), o teste não recebeu `404 Not Found`. Sua rota deve ser capaz de identificar que o recurso não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar agente por completo com método PUT e payload em formato incorreto`
    - **Melhoria sugerida**: Sua rota de atualização completa de agentes (`PUT /agentes/:id`) não está retornando `400 Bad Request` para payloads inválidos. Garanta que a validação de dados ocorra antes da tentativa de atualização.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar agente parcialmente com método PATCH e payload em formato incorreto`
    - **Melhoria sugerida**: Nenhuma sugestão de melhoria disponível.
  - ⚠️ **Falhou no teste**: `CREATE: Recebe status code 400 ao tentar criar caso com payload em formato incorreto`
    - **Melhoria sugerida**: Seu endpoint de criação de casos (`POST /casos`) não está validando payloads incorretos. O teste enviou dados inválidos e esperava um status `400 Bad Request`, mas recebeu outro. Implemente uma validação robusta para os dados de entrada.
  - ⚠️ **Falhou no teste**: `READ: Recebe status code 404 ao tentar buscar um caso por ID inválido`
    - **Melhoria sugerida**: Ao tentar buscar um caso com ID inexistente (`GET /casos/:id`), o teste não recebeu `404 Not Found`. Sua rota deve ser capaz de identificar que o recurso não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar um caso por completo com método PUT com payload em formato incorreto`
    - **Melhoria sugerida**: Sua rota de atualização completa de casos (`PUT /casos/:id`) não está retornando `400 Bad Request` para payloads inválidos. Garanta que a validação de dados ocorra antes da tentativa de atualização.

## ⭐ Itens de Destaque (recupera até 40 pontos)
- Nenhum item bônus foi identificado. Tente adicionar mais estilo e complexidade ao seu código nas próximas tentativas!

## ❌ Problemas Detectados (Descontos de até 100 pontos)
- Foram encontrados `9` problemas que acarretam descontos. Veja abaixo os testes penalizados:
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar um agente com dataDeIncorporacao em formato invalido (não é YYYY-MM,DD)`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com `dataDeIncorporacao` em formato inválido. A validação do formato `YYYY-MM-DD` é essencial para a integridade dos dados.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com nome vazio`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com `nome` vazio. Campos obrigatórios como o nome não devem ser aceitos se estiverem vazios.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com data vazia`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com `dataDeIncorporacao` vazia. Campos obrigatórios como a data não devem ser aceitos se estiverem vazios.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com cargo vazio`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com `cargo` vazio. Campos obrigatórios como o cargo não devem ser aceitos se estiverem vazios.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue alterar ID do agente com método PUT`
    - **Correção sugerida**: Nenhuma sugestão de correção disponível.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue criar um caso com título vazio`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu a criação de um caso com `titulo` vazio. Títulos são campos obrigatórios e não devem ser aceitos se estiverem em branco.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue criar um caso com descrição vazia`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu a criação de um caso com `descricao` vazia. Descrições são campos importantes e não devem ser aceitas se estiverem em branco.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue atualizar um caso com status que não seja 'aberto' ou 'solucionado'`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu a atualização de um caso com um `status` que não é 'aberto' ou 'solucionado'. O campo de status deve ter valores restritos. Implemente uma validação para garantir apenas os valores permitidos.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue alterar ID do caso com método PUT`
    - **Correção sugerida**: Nenhuma sugestão de correção disponível.

---
Continue praticando e caprichando no código. Cada detalhe conta! 💪
Se precisar de ajuda, não hesite em perguntar nos canais da guilda. Estamos aqui para ajudar! 🤝

---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>