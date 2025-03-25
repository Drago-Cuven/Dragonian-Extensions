// This extension allows Scratch projects to use simple machine learning capabilities

(function (Scratch) => {
  if (!window.brain) {
    const script = document.createElement("script")
    script.src = "https://unpkg.com/brain.js@2.0.0-beta.23/dist/brain-browser.min.js"
    script.onload = () => console.log("brain.js loaded successfully")
    script.onerror = () => console.error("Error loading brain.js")
    document.head.appendChild(script)
  }

  // Wait for brain.js to load
  const waitForBrain = () => {
    return new Promise((resolve) => {
      const checkBrain = () => {
        if (window.brain) {
          resolve()
        } else {
          setTimeout(checkBrain, 100)
        }
      }
      checkBrain()
    })
  }

  // Store neural networks by name
  const networks = {}

  class BrainJSExtension {
    getInfo() {
      return {
        id: "brainjs",
        name: "Brain",
        blockIconURI:
          "",
        color1: "#5e72e4",
        color2: "#324ea8",
        blocks: [
          {
            opcode: "createNetwork",
            blockType: Scratch.BlockType.COMMAND,
            text: "create neural network [NAME] type [TYPE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myNetwork",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "networkTypes",
                defaultValue: "feedforward",
              },
            },
          },
          {
            opcode: "addTrainingData",
            blockType: Scratch.BlockType.COMMAND,
            text: "add training data to [NAME]: input [INPUT] output [OUTPUT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myNetwork",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0, 0]",
              },
              OUTPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0]",
              },
            },
          },
          {
            opcode: "trainNetwork",
            blockType: Scratch.BlockType.COMMAND,
            text: "train network [NAME] with [ITERATIONS] iterations",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myNetwork",
              },
              ITERATIONS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1000,
              },
            },
          },
          {
            opcode: "runNetwork",
            blockType: Scratch.BlockType.REPORTER,
            text: "run network [NAME] with input [INPUT]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myNetwork",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0, 0]",
              },
            },
          },
          {
            opcode: "getNetworkError",
            blockType: Scratch.BlockType.REPORTER,
            text: "get error of network [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "myNetwork",
              },
            },
          },
        ],
        menus: {
          networkTypes: {
            acceptReporters: true,
            items: ["feedforward", "recurrent", "lstm"],
          },
        },
      }
    }

    async createNetwork(args) {
      await waitForBrain()

      const name = args.NAME
      const type = args.TYPE

      try {
        switch (type) {
          case "feedforward":
            networks[name] = {
              net: new brain.NeuralNetwork(),
              type: type,
              trainingData: [],
              error: null,
            }
            break
          case "recurrent":
            networks[name] = {
              net: new brain.recurrent.RNN(),
              type: type,
              trainingData: [],
              error: null,
            }
            break
          case "lstm":
            networks[name] = {
              net: new brain.recurrent.LSTM(),
              type: type,
              trainingData: [],
              error: null,
            }
            break
          default:
            networks[name] = {
              net: new brain.NeuralNetwork(),
              type: "feedforward",
              trainingData: [],
              error: null,
            }
        }
        return `Created ${type} neural network: ${name}`
      } catch (e) {
        console.error("Error creating network:", e)
        return "Error creating network"
      }
    }

    async addTrainingData(args) {
      await waitForBrain()

      const name = args.NAME
      let input = args.INPUT
      let output = args.OUTPUT

      if (!networks[name]) {
        return "Network not found"
      }

      try {
        // Parse input and output from string to JavaScript objects
        input = JSON.parse(input)
        output = JSON.parse(output)

        networks[name].trainingData.push({
          input: input,
          output: output,
        })

        return `Added training data to ${name}`
      } catch (e) {
        console.error("Error adding training data:", e)
        return "Error adding training data. Check format."
      }
    }

    async trainNetwork(args) {
      await waitForBrain()

      const name = args.NAME
      const iterations = Number.parseInt(args.ITERATIONS, 10)

      if (!networks[name]) {
        return "Network not found"
      }

      if (networks[name].trainingData.length === 0) {
        return "No training data available"
      }

      try {
        const result = await networks[name].net.train(networks[name].trainingData, {
          iterations: iterations,
          log: true,
          logPeriod: 100,
        })

        networks[name].error = result.error
        return `Trained network ${name} with error: ${result.error}`
      } catch (e) {
        console.error("Error training network:", e)
        return "Error training network"
      }
    }

    async runNetwork(args) {
      await waitForBrain()

      const name = args.NAME
      let input = args.INPUT

      if (!networks[name]) {
        return "Network not found"
      }

      try {
        // Parse input from string to JavaScript object
        input = JSON.parse(input)

        const output = networks[name].net.run(input)
        return JSON.stringify(output)
      } catch (e) {
        console.error("Error running network:", e)
        return "Error running network"
      }
    }

    async getNetworkError(args) {
      await waitForBrain()

      const name = args.NAME

      if (!networks[name]) {
        return "Network not found"
      }

      return networks[name].error || "Not trained yet"
    }
  }

  Scratch.extensions.register(new BrainJSExtension())
})(Scratch)

 