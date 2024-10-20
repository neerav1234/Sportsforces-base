const abi = [
	{
		"inputs": [],
		"name": "createGenericTournament",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "createStakingTournament",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tournamentId",
				"type": "uint256"
			}
		],
		"name": "registerGeneric",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tournamentId",
				"type": "uint256"
			}
		],
		"name": "registerStaking",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tournamentId",
				"type": "uint256"
			}
		],
		"name": "startGenericTournament",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tournamentId",
				"type": "uint256"
			}
		],
		"name": "startStakingTournament",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "player",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tournamentId",
				"type": "uint256"
			}
		],
		"name": "voting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "genericTournamentMapper",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tournamentId",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "matchId",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "player1",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "player2",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "winner",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "Learner",
								"type": "address"
							}
						],
						"internalType": "struct Sportsforces.Match[]",
						"name": "matches",
						"type": "tuple[]"
					},
					{
						"internalType": "address[]",
						"name": "participants",
						"type": "address[]"
					}
				],
				"internalType": "struct Sportsforces.Tournament",
				"name": "tournament",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "matchMapper",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "matchId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "player1",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "player2",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Learner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "remainingMatches",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakingTournamentMapper",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "tournamentId",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "matchId",
								"type": "uint256"
							},
							{
								"internalType": "address",
								"name": "player1",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "player2",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "winner",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "Learner",
								"type": "address"
							}
						],
						"internalType": "struct Sportsforces.Match[]",
						"name": "matches",
						"type": "tuple[]"
					},
					{
						"internalType": "address[]",
						"name": "participants",
						"type": "address[]"
					}
				],
				"internalType": "struct Sportsforces.Tournament",
				"name": "tournament",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "stakedAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userMapping",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "playerRating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "coachRating",
						"type": "uint256"
					},
					{
						"internalType": "string[]",
						"name": "achievements",
						"type": "string[]"
					}
				],
				"internalType": "struct Sportsforces.Sport",
				"name": "badminton",
				"type": "tuple"
			},
			{
				"internalType": "uint256",
				"name": "agility",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "strength",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
export default abi;