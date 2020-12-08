# sistema-compra

Link do sistema para ser acessado pelo Heroku: https://sistema-compra.herokuapp.com/#/

Obs.: aguardar antes de usar o sistema para que a api inicie.

Caso de uso apresentado: Cliente preferencial faz uma compra com descontos, pagando com Pix e acumulando pontos.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Estrutura dos diretórios
```
public
├── favicon.ico
└── index.html
```
```
src
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── CartBox.vue
│   ├── CheckoutProducts.vue
│   ├── Loader.vue
│   └── ProductItems.vue
├── main.js
├── mixins
│   └── money.js
├── router
│   └── index.js
├── scss
│   └── custom.scss
├── services
│   ├── apiFactory.js
│   ├── api.js
│   └── axiosProxy.js
├── store
│   └── index.js
└── views
    ├── Cart.vue
    ├── Checkout.vue
    ├── TransactionPaidError.vue
    └── TransactionPaid.vue
```

### Relatório
O relatório pode ser encontrado [clicando aqui](https://github.com/anavollu/sistema-compra-client/blob/master/Documenta%C3%A7%C3%A3o%20Final%20(Compilado).docx.pdf) ou clicando no arquivo "Documentação Final (Compilado).docx.pdf" nesta mesma página.
