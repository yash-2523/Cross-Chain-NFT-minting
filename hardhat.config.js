require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const { PRIVATE_KEY, ETH_API_KEY } = process.env;
module.exports = {
	networks: {
		// bscTestnet: {
		//   url: "https://data-seed-prebsc-1-s1.binance.org:8545",
		//   chainId: 97,
		//   gasPrice: 20000000000,
		//   accounts: [`0x${PRIVATE_KEY}`]
		// },
		// rinkebyTestnet: {
		//   url: "https://rinkeby.infura.io/v3/901066b27d21462bad7b742e152cfb27",
		//   accounts: [`0x${PRIVATE_KEY}`]
		// },
		// mumbaiTestnet: {
		//   url: "https://polygon-mumbai.infura.io/v3/901066b27d21462bad7b742e152cfb27",
		//   accounts: [`0x${PRIVATE_KEY}`]
		// },
		// avalancheTest: {
		//   url: 'https://api.avax-test.network/ext/bc/C/rpc',
		//   gasPrice: 225000000000,
		//   chainId: 43113,
		//   accounts: [`0x${PRIVATE_KEY}`]
		// },
		hardhat: {},
		eth: {
			url: "https://mainnet.infura.io/v3/d8a462ebbfed401891f2a1a8e1dc49af",
			accounts: [`0x${PRIVATE_KEY}`],
		},
		// bsc: {
		//   url: "https://bsc-dataseed.binance.org/",
		//   chainId: 56,
		//   gasPrice: 20000000000,
		//   accounts: [`0x${PRIVATE_KEY}`]
		// },
		// avax: {
		//   url: 'https://api.avax.network/ext/bc/C/rpc',
		//   gasPrice: 225000000000,
		//   chainId: 43114,
		//   accounts: [`0x${PRIVATE_KEY}`]
		// }
	},
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
			},
		},
	},
	etherscan: {
		apiKey: ETH_API_KEY,
	},
};
