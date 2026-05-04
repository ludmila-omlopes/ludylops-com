---
title: Ethereum está perto do PoS
excerpt: Saiba também o que aconteceu no hack de Solana e da Nomad bridge!
status: publicado
date: 2022-08-05
---

# Ethereum está perto do PoS

*Originalmente publicado por mim na [Imagina Cripto](https://imaginacripto.substack.com/p/-ethereum-esta-perto-do-pos).*

A rede do Ethereum está cada dia mais perto de se tornar Proof of Stake. Isso é indiscutível. Planejado desde sua concepção, há 7 anos, estamos finalmente **a uma testnet de distância** do tão esperado Merge da Ethereum Mainnet.

## Ethereum Merge está cada dia mais perto

![Panda meme](https://substackcdn.com/image/fetch/$s_!Qvbg!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fbfb69d8c-9268-4785-9c74-20c40737fccb_600x502.jpeg)

### Görli Merge em 11 de Agosto

Depois de uma operação [bem sucedida na Ropsten](https://www.coindesk.com/tech/2022/06/08/ethereums-ropsten-testnet-merge-imminent/) (Ethereum testnet) e alguns, também bem-sucedidos, [shadow forks](https://decrypt.co/106071/ethereum-deploys-shadow-fork-10-in-buildup-to-merge), temos a última operação em uma testnet com **previsão para o dia 11 de Agosto**. É possível acompanhar a previsão do momento exato [aqui](https://bordel.wtf/).

Essa é a última rede de teste a sofrer um Merge e, se tudo der certo, o Merge da mainnet deve ser agora em **Setembro**.

### Ok mas... o que raios é um Merge?

O Merge do Ethereum nada mais é do que a **mudança na forma de consenso da rede de Proof of Work para Proof of Stake**. O Proof of Work (PoW) é o consenso que todos conhecem popularmente por “mineração” (atual mecanismo de consenso do Bitcoin), onde você coloca uma quantidade absurda de placas de vídeo torcendo pro lucro ser maior que os 4 dígitos da sua conta de luz (melhor dos casos para mineração em pool).

![Centro de mineração de Bitcoin](https://substackcdn.com/image/fetch/$s_!KhPt!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb78889df-eeba-4dc8-81fb-4731fca4964e_800x533.jpeg)
[Centro de mineração de Bitcoin](https://www.bloomberg.com/news/articles/2021-12-21/bitcoin-miner-terawulf-buys-15-000-computers-for-ny-facility)

O Proof of Stake (PoS) vem pra mudar isso. Após o Merge, **o consumo de energia da rede do Ethereum vai cair vertiginosamente**, estima-se que [cerca de 99%](https://spectrum.ieee.org/ethereum-plans-to-cut-its-absurd-energy-consumption-by-99-percent). Essa é a grande mudança após o Merge. **A rede não vai ficar mais barata nem mais rápida** após a mudança pra PoS, isso é um trabalho para as soluções de escalabilidade como layer 2s, que vamos abordar mais pra frente.

### Riscos

![I Have No Speech](https://substackcdn.com/image/fetch/$s_!g-wQ!,w_1272,c_limit,f_webp,q_auto:good,fl_lossy/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F0b678c87-e872-4703-8e71-52ef5b5bf696_495x360.gif)

Toda e qualquer mudança na blockchain **vem carregada de riscos**, e o Merge é uma delas. Alguns dos riscos mapeados são:

- **Fork**. Alguns mineradores sinalizaram o interesse em continuar a rede PoW. Dependendo da quantidade de interessados, isso vai causar uma **divisão na rede** similar ao que aconteceu com o ETC (Ethereum Classic) e, consequentemente, a criação de uma nova moeda, que alguns estão chamando de ETH1. Você como investidor de longo prazo (que espero muito que seja o caso!) **não precisa se preocupar**. Se isso acontecer, você vai receber uns ETH1 que muito provavelmente vão custar alguns centavos de dólar.
- **Falha técnica**. O planejamento do Merge é extenso e cheio de fases de teste. Como eu disse anteriormente, já foram diversos testes diferentes executados, todos com **problemas minoritários**, e o time responsável está comprometido a não executar a mudança caso tenha algum risco relevante. Além disso, essa mudança não é feita toda de uma vez, é feita de uma forma modularizada.

Observe a imagem a seguir feita pelo [Yule](https://twitter.com/yulesa), analista de dados  da [Messari](https://messari.io/) e amigo meu. Nessa imagem é possível observar que a camada de PoS (chamada de *Beacon Chain*) já está em execução há meses, e o Merge é só uma junção dela com a camada onde ficam os aplicativos (*Data Layer*):

![Diagrama do Merge](https://substackcdn.com/image/fetch/$s_!WI5L!,w_1272,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Faaeaaa19-3fe5-4c99-b5da-99f285d624c8_624x374.png)
Fonte: [Yule](https://twitter.com/yulesa/status/1382429264683925504)

Mas, como qualquer alteração de software, **sempre existe um risco de algum bug ser introduzido no código** e os diversos rounds de teste existem para minimizar isso o máximo possível.

Vou dar uma pausa aqui, pois, se eu não prestar atenção, vou entrar num buraco negro de informações técnicas e preciso saber se vocês têm interesse em explicações mais detalhadas!