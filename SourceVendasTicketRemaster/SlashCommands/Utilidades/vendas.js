const Discord = require("discord.js")


module.exports = {
  name: "setproduct", // Coloque o nome do comando
  description: "Setar Produto", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
        name: "canal",
        description: "selecione um canal",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true,
    },
    {
        name: "preco",
        description: "selecione o preço do produto",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "estoque",
        description: "selecione o estoque",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
    {
        name: "produto",
        description: "selecione um produto",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)){
        interaction.reply({ content: `Você não possui permissão para usar este comando! ${interaction.user}`, ephemeral: true })
    } else {

       

        let canal = interaction.options.getChannel("canal")
        let preco = interaction.options.getString("preco")
        let estoque = interaction.options.getString("estoque")
        let produto = interaction.options.getString("produto")

        

        if (canal.type !== Discord.ChannelType.GuildText){
            interaction.reply({ content: `Selecione um canal de texto!`, ephemeral: true })
        } else {

           let emb = new Discord.EmbedBuilder()
           .setColor("Random")
           .setDescription(`Sistema ativado com sucesso!\n\nCanal selecionado: ${canal}\nProduto selecionado: \`${produto}\`\nPreço escolhido: \`${preco}\`\nEstoque selecionado: \`${estoque}\``)
           .setFooter({ text: `NYX Community | Sales System` })

           interaction.reply({ embeds: [emb], ephemeral: true })
           
                const emb3 = new Discord.EmbedBuilder()
                .setTitle('Sales | NYX Community')
                .setColor("Random")
                .setImage('https://cdn.discordapp.com/attachments/1078114406250066021/1083798599248396389/nyxbannerverde.png') //Banner da sua store ;)
                .setThumbnail('https://cdn.discordapp.com/attachments/1078114406250066021/1083798599512633406/nyxverde.png') //Avatar da sua store ;)
                .setDescription(`🛒 Produto: \`${produto}\`\n💵 Preço: \`${preco}\`\n📦 Estoque: \`${estoque}\``)
                .setFooter({ text: `NYX Community | Sales System` })

                const ticket = new Discord.ActionRowBuilder()
                .addComponents([
                    new Discord.ButtonBuilder()
                    .setCustomId('ticket1')
                    .setLabel('Comprar')
                    .setEmoji('🛒')
                    .setStyle(Discord.ButtonStyle.Success)
                ])

                canal.send({ embeds: [emb3], components: [ticket] })

        }  

    }


  }
}