---
title: Understanding the Ultrasound Money
excerpt: A guided walkthrough of ultrasound.money, Ethereum issuance, burn, supply growth, and post-Merge ETH analytics.
status: publicado
date: 2023-05-12
---

# Understanding the Ultrasound Money

![Understanding the Ultrasound Money cover](https://storage.googleapis.com/papyrus_images/78e6d1c915f2bd5dd8a42323a51347e144aed6ad872556f7c213afd67af43143.jpg)

*Originalmente publicado por mim em inglês no [Paragraph](https://paragraph.com/@definn/understanding-the-ultrasound-money).*

---

**Update: Some screenshots are more recent than others. The dates are indicated in each one of them.**

Since Merge, the [Ultrasound Money](https://ultrasound.money/) became one of the most popular analytics website to track post-Merge data. But have you explored all charts and data available in it? I’m sure there is some alpha you’re missing, and I’ll help you out.

⛽ Gas Tracker
-------------

Right in the top-left corner (and tab name) we have the Gas Tracker.

Did you know you can activate **price alerts** here? It's a good tool for NFT speculators, since high gas prices usually mean a (badly designed) mint is going on.

![](https://storage.googleapis.com/papyrus_images/0be80035bc5da25065e449192d675bfbd4ef4113644e5df548c6f3c62defc12a.png)

📉 Supply Chart
---------------

Now the fun begins: the Supply Chart. The go-to-chart of BTC Maxis trying to feed the narrative of “Ethereum didn't deliver its ultrasound promises”. The supply data shows the balance of emitted ETH minus the burned ETH since the Merge, hence, the **supply change**.

![Oct 20th 2022](https://storage.googleapis.com/papyrus_images/30000a2b8c8e2c6e94ecde363e3f1ddfb2f828214f60e7b488e0cd0acd1fc882.png)

Oct 20th 2022

This is what happens when we toggle the “simulate PoW” button. So yes, since The Merge the supply has increased but, here, we see the comparison with PoW emissions. And with BTC. **The ETH emission post-Merge is ridiculously smaller than BTC’s.**

The emission rate is not fixed, so the %s on the chart represent an average since merge.

![Oct 20th 2022](https://storage.googleapis.com/papyrus_images/14afc13faf239e9970ac70bf29885e9a1cc84237e0f28dca994a95ad2ebff275.png)

Oct 20th 2022

🪙 Issuance
-----------

Going further down the website, we can explore more in details every single aspect and variables that influence ETH supply growth rate. Here, we can simulate the yearly burn rate according to past data. The time frame that is chosen when we load the website is 1 day.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/d8b31a17691f5b11d2d252db27e40237628ac04b1ebb574b377e204ed7e7e565.png)

Oct 9th 2022

It's important to understand that ETH is being burned way before the Merge, since the London Fork that happened on Aug 5th 2021 and activated the EIP 1559. You can check historical data on [Etherscan](https://etherscan.io/chart/dailyethburnt) if you want to test higher timeframes. The numbers match. I've checked.

![Etherscan - Oct 9th 2022](https://storage.googleapis.com/papyrus_images/05c14c68d7f4caa122f90303529ba0c3df5e5c1966ffe0402cb77247b6c7bfac.png)

Etherscan - Oct 9th 2022

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/161b3841fdc8a2d73abcee69c22eae1e565d12cc48399d0ebdd1a4443efbd1af.png)

Oct 9th 2022

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/bdf9fc943759824bba6bee94a8e908f3d108582e8047588d6e9069daad9bcf32.png)

Oct 9th 2022

The Yearly Issuance is a calculated estimation. For PoS issuance, the main variables are: Total ETH Staked Online Validators Ultrasound constantly reads both values from the chain and calculates a yearly projection. And here, again, we have the “simulate PoW” option.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/097cbfd2738bae41ed675b372c3011e37f322f4bd633e816507aac899ccfb8eb.png)

Oct 9th 2022

📒 Bonus: ETH Emission Estimator Spreadsheet
--------------------------------------------

I've created an “ETH Emission Estimator” spreadsheet using the information right from Ethereum's GitHub, that contains detailed information on emission. Feel free to clone it and simulate a few scenarios. Slashing and burning will be included later.

[https://t.co/Fl16ky3mdC](https://t.co/Fl16ky3mdC)

📈 Supply Growth
----------------

Finally, we have the Supply Growth. The calculation here is simple: it takes the emission, subtracts the burn (avg from the chosen timeframe) and calculates the emission rate on top of current ETH supply. So, the Supply Growth rate depends on the following assumptions.

* The amount of staked ETH will remain basically the same trough the year;
* The amount of online validators will remain constant;
* The activity on-chain will remain constant (this parameter is the most volatile one).

That's why simulating scenarios is so important.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/c228e83c5281dcf9a77bfb30eb0d4ce99ff479c4ecd22ec75134c45943ce58e2.png)

Oct 9th 2022

🚧 Gas Market
-------------

The “Gas Market” widget shows the average base fee from the last hour. In current emission conditions, 15 Gwei is the minimum base fee for burning to exceed emission. It's the ultrasound barrier. Btw this is an estimation that is not always true for all blocks.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/f93988643dded5bdab1f9e17fbf42f71a326221f725a7f845f803e1cd0060a78.png)

Oct 9th 2022

We can't change the time-frame here, meaning that these numbers are useful for in-time burn rates.

**❗ Remember: network usage (therefor, ETH burn) is highly volatile, so estimating different scenarios is highly recommended.**

For a higher timeframe, you can check Etherscan.

![Etherscan - Oct 9th 2022](https://storage.googleapis.com/papyrus_images/1027e151c33d306c36aba79cdc3915e93ca398bf09d87a9f3b1969da7478450b.png)

Etherscan - Oct 9th 2022

⚖️ Supply Projection
--------------------

The Supply Projection charts are a bit tricky. It took me a while to understand, and now I'll help you out. The first one loads the Issuance Rewards according to current amount staked, and the Burn Rate according to average burn rate SINCE THE BEGINNING OF THE BEACON CHAIN.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/58fa092805ea2b9c313935ed8db2449e7f49c58e989f4be334f09089670c20c4.png)

Oct 9th 2022

Yes, this is what the “all” means: if you scroll back to the burn “speedometer” and change the timeframe to “all”, this is the burning rate being considered in the 200y projection chart. But here shown as a percentage on top of the supply.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/67c533958aef71fe98cda862ee22ffaed181029f05528cb3bd1717528a37604f.png)

Oct 9th 2022

If you want to simulate the Supply Equilibrium with an average burn rate closer to today, just slide it to the left. And remember: burn rates are directly tied to network usage and are quite volatile. Try to simulate scenarios with high and low usage.

The 2y chart is a zoom-in from the above, showing more details on supply split between wallets, contracts and staking, according to historical data. The projection on this chart assumes that the amount of ETH staked and locked in contracts will stay the same.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/39609f5c22f3e530e699a9348f0167b2fa1d7b647605a84fb83e4a4f7b682723.png)

Oct 9th 2022

It's also useful to simulate different scenarios. If we assume that the amount of ETH staked and locked in contracts will grow 1%/y (a conservative growth of the ecosystem) and the emission will reduce 1.36%/y, the ETH in circulation will be: 71% in 2y 56% in 20y.

![](https://storage.googleapis.com/papyrus_images/5efb71b6c7ded4ab58b2763a2443b116055660ea7ac7574806f6cf8406b5f818.png)

🔥 The Burn
-----------

The indicators are a breakdown of the same estimation we've seen in the “Supply Growth” section. If you choose the same timeframe and multiply the “Burn Total” number to match a year, the numbers will match. And we can convert the numbers to USD using the current price.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/5401219b19399b41663353ba0fb7fb7a423a341663776e08c68317dc7d5353ae.png)

Oct 9th 2022

The Burn Leaderboard and Categories are useful to break down network usage. Fun Fact: In the last 30 days, new contract deployments alone were responsible for more than 800 ETH burned.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/552765de40dcccf6e4bd8656973cc1c7c5456f4023bd9208357b1ffd29b2a7a3.png)

Oct 9th 2022

Burns per Block is self-explanatory. Watching this widget for a few seconds, you'll notice that blocks generated with same gas price can burn a hole different amount of ETH. Why? Because of block sizes. Larger blocks will burn more ETH, even with smaller avg gas prices.

![](https://storage.googleapis.com/papyrus_images/4a19cfb8370798a33daf6f64a8e9ae3270848d6917c8f7c9cba5b29ac4e23973.png)

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/70242cb2c94fb33ac93a8f72b3633e423b88d23e94c4ab6a12653846083fd6e1.png)

Oct 9th 2022

🏦 Total Value Secured – TVS
----------------------------

TVS: Total Value Secured. These numbers represent: Ethereum's marketcap ERC20s' marketcap NFTs' marketcap.

I personally don't see the point in analyzing these numbers separately, neither have seen this metric around apart from in the Chainlink community. But the Security Ration (the ratio of TVS/Amount Staked) is an interesting metric to follow historically.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/9b76bff4c9fd426b943d83ea8b0486d1cb8a949206af361281f4f69606869d5f.png)

Oct 9th 2022

It follows one of the beauties of the PoS system: the monetary aspect of the chain currency participating directly in the decentralization, by the staking mechanism. So smaller this number is, we have more validators securing the network and more ETH out of circulation.

![](https://storage.googleapis.com/papyrus_images/5efb71b6c7ded4ab58b2763a2443b116055660ea7ac7574806f6cf8406b5f818.png)

➕ Monetary Premium
------------------

The Monetary Premium section is complex in terms of concepts, and I'll explore it in depth in another day. For now, you can check: the projected APR for validators (run a node!) how is Ethereum positioned in the market in terms of P/E, compared to other companies.

![Oct 9th 2022](https://storage.googleapis.com/papyrus_images/757f2ab98b20eee32ea93965e32298a7e4f7f6ed7ea0f935756c6286149a19f6.png)

Oct 9th 2022

🔬 Issuance Breakdown
---------------------

Finally, the Issuance Breakdown. Where does each ETH in existence come from? 50% of all ETH was distributed during the initial crowdsale. But now there are more than 2M unique addresses that hold ETH, being the Beacon Chain contract, the largest holder.

![Etherscan](https://storage.googleapis.com/papyrus_images/6b1e5e31b57eed9086414a94f964911cbf37ac2d0f84449ef96676649ea9e9f1.png)

Etherscan

🖼️ POAP
--------

Ultrasound team has just released their POAP! From the 5000+ Twitter fam, only 1559 were chosen to receive it, based on the amount of fam followers. The 1559 number is a mention to the famous EIP 1559 that introduced the burn mechanism to Ethereum.

![](https://storage.googleapis.com/papyrus_images/8719375a87e5952d4450c488b9ba4c1bef79d6d8abe8a238dcc9c0efe752e6b0.png)
