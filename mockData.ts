const apps = [

    //Одно приложение
    {
        id: "9c175e1acfd44fabac38a0ba92625ae3",
        name: 'название приложения',
        description: 'описание',

        // Списки вещей, для каждого списка свой статус шагов и свой набор вещей
        itemsCheckLists: [{
            "id": 1,
            "name": 'Название списка вещей',
            "description": 'описание',
            steps: [{
                step1: {
                    "sex": "Женщина"
                }
            },
                {
                    step2: {
                        "days": 7,
                    }
                },
                {
                    step3: {
                        "weather": "Теплая",
                    }
                },
                {
                    step4: {
                        "destination": "По стране",
                    }
                },
                {
                    step5: {
                        "trip_type": "Коммандировка"
                    }
                },
            ],

            //После завершенных 5 шагов, пользователю генерим список вещей по категориям
            checkList: [{
                category1: {
                    title: 'название категории',
                    list: [1, 2, 3, 4, 1, 2323]
                },
                category2: {
                    title: 'название категории',
                    list: [1, 2, 3, 4, 1, 2323]
                },
                category3: {
                    title: 'название категории',
                    list: [1, 2, 3, 4, 1, 2323]
                }
            }]
        },

        ]
    },

    //APP2 example
    {
        id: "9c175e1acfd44faba23232c38a0ba92625ae3",
        name: 'название приложения',
        description: 'описание',

        // Списки вещей, для каждого списка свой статус шагов и свой набор вещей
        itemsCheckLists: [{
            "id": 1,
            "name": 'Название списка вещей',
            "description": 'описание',
            steps: [{
                step1: {
                    "sex": null
                }
            },
                {
                    step2: {
                        "days": null,
                    }
                },
                {
                    step3: {
                        "weather": null,
                    }
                },
                {
                    step4: {
                        "destination": null,
                    }
                },
                {
                    step5: {
                        "trip_type": null
                    }
                },
            ],

            //После завершенных 5 шагов, пользователю генерим список вещей по категориям
            checkList: [{
                category1: {
                    title: 'название категории',
                    list: [1, 2, 3, 4, 1, 2323]
                },
                category2: {
                    title: 'название категории',
                    list: [1, 2, 3, 4, 1, 2323]
                },
                category3: {
                    title: 'название категории',
                    list: [1, 2, 3, 4, 1, 2323]
                }
            }]
        },

        ]
    },

]