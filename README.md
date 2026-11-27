# Playwright | Wizard Bank — Test Automation Project

Projeto de automação de testes E2E desenvolvido com **Playwright, JavaScript e Page Object Model (POM)**, com foco na validação dos fluxos bancários das áreas Customer e Manager.

O trabalho envolveu análise das funcionalidades, definição de cenários, implementação de testes automatizados, investigação de falhas na execução e validação dos resultados obtidos.

## 1. Contexto do produto

O **Wizard Bank** é uma aplicação web de simulação bancária que permite interações entre dois perfis: clientes e gerentes bancários.

A plataforma disponibiliza funcionalidades relacionadas à administração de clientes, abertura de contas e operações bancárias.

A partir da exploração da aplicação, identifiquei dois contextos principais:

- **Customer:** acesso à conta, consulta de informações bancárias, depósitos, saques e histórico de transações.
- **Manager:** gerenciamento de clientes, abertura de contas, seleção de moedas e pesquisa de clientes.

Esses fluxos foram utilizados como base para identificar comportamentos que precisavam ser validados, considerando a integridade das operações e a consistência das informações apresentadas ao usuário.

## 2. Análise e definição da estratégia

Antes da implementação, explorei os fluxos disponíveis na aplicação para compreender como as funcionalidades se relacionavam e quais resultados deveriam ser apresentados em cada operação.

A análise foi direcionada à identificação de comportamentos essenciais para cada perfil de usuário.

### Critérios considerados na seleção dos cenários

- **Acesso:** verificar se cada perfil consegue acessar corretamente suas funcionalidades.
- **Integridade dos dados:** verificar se as informações de clientes e contas são apresentadas corretamente.
- **Regras das operações:** validar condições de depósitos e saques, incluindo situações de saldo insuficiente.
- **Gerenciamento:** verificar se clientes podem ser cadastrados, pesquisados e excluídos.
- **Consistência das informações:** verificar se a abertura de contas e a seleção de moedas apresentam os resultados esperados.
- **Histórico:** verificar se as transações são apresentadas corretamente e se a tabela mantém sua estrutura mesmo quando não existem registros.

### Estratégia de cobertura

A cobertura foi organizada em dois contextos funcionais:

**Customer — 5 cenários de referência**

- Validação dos dados bancários da conta.
- Realização de depósito e validação da transação.
- Validação da mensagem de erro ao tentar sacar com saldo zero.
- Logout do cliente.
- Validação dos elementos da lista de transações vazia.

**Manager — 8 cenários implementados**

- Login do gerente.
- Cadastro de novo cliente.
- Exclusão de cliente.
- Abertura de conta.
- Seleção de moedas.
- Pesquisa de cliente pelo primeiro nome.
- Pesquisa de cliente pelo sobrenome.
- Pesquisa de cliente pelo código postal.

Os cenários da área Manager foram implementados a partir da análise dos fluxos da aplicação. Na área Customer, utilizei os testes de referência existentes no projeto, realizando ajustes necessários para garantir sua execução e validação.

## 3. Execução e validação

A automação foi desenvolvida com **Playwright e JavaScript**, utilizando o padrão **Page Object Model (POM)** para separar os elementos e as interações das páginas da lógica dos testes.

### Organização da automação

A estrutura foi organizada em:

- `src/pages/`: classes responsáveis pelos elementos e pelas interações com as páginas.
- `tests/customer/`: testes relacionados às funcionalidades do cliente.
- `tests/manager/`: testes relacionados às funcionalidades do gerente.
- `playwright.config.js`: configuração da execução dos testes.

Essa organização permite centralizar seletores e interações, reduzir duplicações e facilitar a manutenção dos testes.

### Estratégias de localização dos elementos

A escolha dos seletores considerou a identificação dos elementos e a estabilidade das interações.

Foram utilizadas estratégias como:

- `getByRole()`: localizar elementos por sua função semântica, como botões e linhas de tabelas.
- `locator()`: acessar elementos por seletores CSS quando necessário, como campos identificados por atributos específicos.
- `selectOption()`: selecionar opções de campos HTML do tipo select.

Um exemplo ocorreu no login do Customer. Durante a execução, identifiquei que o campo `#userSelect` estava disponível antes de suas opções serem carregadas.

Para evitar uma seleção prematura, incluí uma espera explícita pela primeira opção de cliente e realizei a seleção pelo valor interno da opção.

Essa decisão tornou a interação compatível com o carregamento assíncrono da aplicação.

### Assertions e validação dos resultados

Utilizei as assertions do Playwright para comparar o comportamento obtido com o comportamento esperado.

Entre as validações realizadas estão:

- Visibilidade de elementos e mensagens.
- Conteúdo apresentado nos dados bancários.
- Valor e tipo das transações.
- Estrutura e conteúdo dos cabeçalhos de tabelas.
- Resultados das operações de gerenciamento de clientes.
- Comportamento apresentado após o logout.

A validação não se limitou a verificar se uma ação foi executada. O objetivo foi verificar se a aplicação apresentou o resultado esperado após cada interação.

## 4. Investigação e documentação de falhas

Durante a execução, investiguei falhas que inicialmente impediam a conclusão de alguns testes.

O processo envolveu analisar mensagens de erro, identificar a etapa em que a execução era interrompida e verificar se o problema estava relacionado ao comportamento da aplicação ou à sincronização da automação.

### Investigação do carregamento das opções de clientes

**Comportamento observado:**

O Playwright encontrava o campo de seleção de clientes, mas não conseguia selecionar uma opção dentro do tempo limite.

**Investigação:**

Verifiquei que o campo estava presente na página, mas as opções ainda não estavam disponíveis no momento da interação.

**Ajuste realizado:**

Implementei uma espera pela presença da primeira opção no dropdown antes de executar `selectOption()`.

### Investigação da atualização do histórico de transações

**Comportamento observado:**

Após realizar um depósito, a validação não encontrava imediatamente a transação correspondente no histórico.

**Investigação:**

Analisei o conteúdo da página e as linhas da tabela. Também identifiquei que a primeira linha de dados não representava necessariamente a transação mais recente.

**Ajuste realizado:**

Ajustei a localização das transações para identificar o registro correspondente ao valor depositado e considerei o tempo necessário para a atualização da lista após a navegação.

### Diferenciação entre falha da aplicação e falha da automação

Essas investigações demonstraram a importância de não classificar automaticamente toda falha de execução como defeito do produto.

Foi necessário verificar se o problema estava no comportamento da aplicação, na disponibilidade dos elementos, na sincronização ou na estratégia de localização utilizada pelo teste.

Os problemas identificados nessas investigações foram tratados como ajustes na automação. Não foram registrados defeitos de aplicação no Jira neste projeto, nem realizada classificação formal de severidade e prioridade.

## 5. Reteste e regressão

Após os ajustes nos testes, executei novamente os cenários afetados individualmente para verificar se as correções na automação permitiam concluir os fluxos esperados.

Posteriormente, executei a suíte completa para verificar se os ajustes mantinham a execução dos demais cenários.

Essa execução geral permitiu avaliar a consistência dos testes Customer e Manager em conjunto.

Não foi realizado um processo formal de reteste de defeitos de aplicação ou uma campanha independente de testes de regressão. A validação final correspondeu à nova execução da suíte automatizada após os ajustes.

## 6. Resultado e conclusão

A execução completa da suíte apresentou os seguintes resultados:

| Indicador | Resultado |
|---|---:|
| Total de testes executados | 13 |
| Testes aprovados | 13 |
| Testes reprovados | 0 |
| Taxa de aprovação | 100% |
| Navegador | Chromium |
| Tempo total | 46,5 segundos |

Durante o desenvolvimento e a execução da automação, foram identificadas falhas relacionadas à sincronização dos elementos e à atualização das informações apresentadas pela aplicação.

Após investigar os comportamentos, foram realizados ajustes na estratégia de interação e localização dos elementos, permitindo a execução correta dos cenários afetados.

Na validação final, a suíte completa apresentou **13 testes aprovados e nenhum reprovado**, demonstrando que os ajustes realizados permitiram concluir os fluxos automatizados previstos para as áreas Customer e Manager.

O trabalho resultou na implementação de 8 cenários automatizados para a área Manager e na adequação dos testes de referência da área Customer.

Além da cobertura funcional, o projeto permitiu desenvolver e aplicar conhecimentos relacionados à organização da automação com POM, utilização de seletores, assertions, sincronização de elementos e investigação de falhas durante a execução.

A experiência reforçou a importância de compreender o comportamento esperado do produto, analisar as evidências antes de realizar alterações e verificar se os ajustes implementados realmente resolvem o problema identificado.

## 7. Tecnologias e ferramentas

- **JavaScript:** linguagem utilizada na implementação dos testes.
- **Playwright:** automação de testes E2E e validação de comportamentos.
- **Page Object Model (POM):** organização e reutilização de elementos e interações.
- **Git e GitHub:** controle de versão e publicação das alterações.
- **Chromium:** navegador utilizado na execução da suíte.

## 8. Como executar o projeto

### Instalação

```bash
npm install
npx playwright install
```

### Executar os testes em modo headless

```bash
npx playwright test
```

### Executar em modo UI

```bash
npx playwright test --ui
```

### Executar em modo debug

```bash
npx playwright test --debug
```

### Gerar e visualizar o relatório HTML

```bash
npx playwright show-report
```

## 09. Pull Request

- [Implementação de testes automatizados para a área Manager e ajustes nos testes Customer](https://github.com/mate-academy/qa_pw_wizard_bank_pom/pull/190)

---

**Projeto desenvolvido como parte do meu portfólio de Quality Assurance, com foco no desenvolvimento de competências em análise de requisitos, testes funcionais, automação E2E e investigação de falhas.**
