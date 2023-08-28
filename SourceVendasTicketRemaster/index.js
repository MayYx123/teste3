const Discord = require("discord.js");
const { Client, Intents, GatewayIntentBits, ActivityType, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require("./config.json");

client.login(config.token);


client.on("ready", () => {
  console.log(`💜 | Logado em: ${client.user.username}!`)
})


let status = [
  `/Ajuda 🤖`,
`Nyx Community 🦇`,
`Kiev#0001 < / >`
],
i = 0

setInterval(() =>{
client.user.setActivity(`${status[i++ % status.length]}`, { 
})
}, 4000);



module.exports = client;
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.config = require("./config.json");
require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

client.once("ready", () => {
    console.log("💜 | Vazado: NYX Community")
})



client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    }
});



client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()){
      if (interaction.customId === 'ticket1'){
        let nome_canal = `🛒-${interaction.user.username}`
        let canal = interaction.guild.channels.cache.find(c => c.name === nome_canal)
  
        if (canal) {
          interaction.reply({ content: `Você já possui um ticket aberto em ${canal}.`, ephemeral: true })
        } else {
  
          let categoria = interaction.channel.parent
          if (!categoria) categoria = null;
          
          interaction.guild.channels.create({
  
            name: nome_canal,
            parent: categoria,
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: [ Discord.PermissionFlagsBits.ViewChannel ]
              },
              {
                id: interaction.user.id,
                allow: [
                  Discord.PermissionFlagsBits.ViewChannel,
                  Discord.PermissionFlagsBits.AddReactions,
                  Discord.PermissionFlagsBits.SendMessages,
                  Discord.PermissionFlagsBits.AttachFiles,
                  Discord.PermissionFlagsBits.EmbedLinks
                ]
              },
            ]
            
            
  
          }).then( (chat) => {
  
            interaction.reply({ content: `Seu ticket foi aberto com sucesso em: ${chat}`, ephemeral: true })
  
            let emb10 = new Discord.EmbedBuilder()
            .setColor("Random")
  
            .setDescription(`Olá ${interaction.user}, ticket aberto com sucesso, siga as orientações!\n\n📜 Antes de efetuar qualquer tipo de compra, leia os termos!\n\n** Não fazemos devoluções se não gostar do produto.**\n**Aceitamos pix, paypal e marcado pago!**\n**Caso aconteça qualquer venda externa, não nós responsabilizamos!**\n\n**Pix:** \n**Mercado pago:**\n**PayPal:**\n**Após efetuar a compra, mande o comprovante aqui!**\n\n**Observação:**\n**Botões Azuis: Somente a Equipe NYX Community pode usar!**\n**Botões Verdes: Qualquer um pode usar**`)
  
            .setFooter({ text: `NYX Community - Sales System` })
  
            let fechar10 = new Discord.ActionRowBuilder()
            .addComponents([
              new Discord.ButtonBuilder()
            .setCustomId('close_10')
            .setEmoji('🔒')
            .setLabel('Fechar')
            .setStyle(Discord.ButtonStyle.Primary)
            ])
            .addComponents([
              new Discord.ButtonBuilder()
              .setCustomId('aprovar_10')
              .setLabel('Aprovar Compra')
              .setEmoji('✅')
              .setStyle(Discord.ButtonStyle.Primary)
            ])
            .addComponents([
              new Discord.ButtonBuilder()
              .setCustomId('sobre_10')
              .setLabel('QRCode')
              .setEmoji(`<:qrcodenyx:1091063770614337717> `)
              .setStyle(Discord.ButtonStyle.Success)
            ])
            .addComponents([
              new Discord.ButtonBuilder()
              .setCustomId('pix')
              .setLabel('Chave Pix')
              .setEmoji('💸')
              .setStyle(Discord.ButtonStyle.Success)
            ])
  
            chat.send({ embeds: [emb10], components: [fechar10] }).then(m => {
              m.pin()
            })
          })
        }
      } else if  (interaction.customId === 'close_10') {
  
        const member = interaction.member;
        const roleId = '1078113995174723607'; //id do cargo que tem permissão para fechar o ticket
    
        if (member.roles.cache.has(roleId)) {
          
            interaction.reply({
              ephemeral: true,
              embeds: [
                new Discord.EmbedBuilder()
                .setColor("Random")
                .setDescription(`Sucesso, ticket será fechado em \`5\` segundos`)
                .setTimestamp()
              ]
            })
            setTimeout(()=>{
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setDescription(`Sucesso, ticket será fechado em \`4\` segundos`)
                ]
              })
            }, 1000)
            setTimeout(()=>{
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setDescription(`Sucesso, ticket será fechado em \`3\` segundos`)
                ]
              })
            }, 2000)
            setTimeout(()=>{
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setDescription(`Sucesso, ticket será fechado em \`2\` segundos`)
                ]
              })
            }, 3000)
            setTimeout(()=>{
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setDescription(`Sucesso, ticket será fechado em \`1\` segundos`)
                ]
              })
            }, 4000)
            setTimeout(()=>{
              interaction.editReply({
                ephemeral: true,
                embeds: [
                  new Discord.EmbedBuilder()
                  .setColor("Random")
                  .setDescription(`Sucesso, ticket fechado!`)
                ]
              })
            }, 5000)
            
            
           
            try {
              setTimeout( () => {
                interaction.channel.delete().catch(e => {return} )
              }, 5000)
            } catch (e) {
              return;
            }
  
  
        } else {
          // O usuário não tem o cargo necessário
          interaction.reply({ content: 'Você não tem permissão para usar este botão!', ephemeral: true });
        }
      } else if (interaction.customId ==='aprovar_10'){
  
        const member = interaction.member;
        const RoleId = '1078114864213524632'; //id do cargo que tem permissão para aprovar uma compra
  
        if (member.roles.cache.has(RoleId)){
  
          interaction.reply(`**✅ Sucesso, a compra foi aprovada, aguarde para receber seu produto, se demorar pode me mencionar:**\n**Qualquer erro ou dúvida, abra um ticket   !**`)
  
        }
  
        
      } else if (interaction.customId ==='sobre_10'){
  
        let emb_sobre = new Discord.EmbedBuilder()
        .setColor("Random")
        .setImage(`https://cdn.discordapp.com/attachments/1091058509346512966/1091061015048880268/NYXCommunity.png`)// QRCode do seu PIX
  
        interaction.reply({ embeds: [emb_sobre], ephemeral: true })
      } else if (interaction.customId ==='pix'){
  
        let emb_pix = new Discord.EmbedBuilder()
        .setColor("Random")
        .setDescription(`Kievlindo@gmail.com`)//Sua chave PIX
  
        interaction.reply({ embeds: [emb_pix], ephemeral: true })
      }
      
        if (interaction.customId === 'close_10'){
  
        const topic = interaction.channel.topic
  
        const channel = interaction.channel
  
        const discordTranscripts = require("discord-html-transcripts")
  
        const attachment = await discordTranscripts.createTranscript(channel);
  
       
  
        let embed = new Discord.EmbedBuilder()
        .setDescription(`**❱ Ticket de:**\n↳ <@${topic}>\`(${topic})\`\n\n**❱ Deletado pelo staff:**\n↳ ${interaction.user}\`(${interaction.user.id})\``)
        .setColor("Random")
        .setTimestamp()
        .setFooter({
          iconURL: interaction.guild.iconURL({ dynamic: true }),
          text: ("© Todos os diretos reservados")
      });
  
        interaction.guild.channels.cache.get('1079165309904232579').send({ //ID DO CANAL PARA ENVIAR AS LOGS
          embeds: [embed],
          files: [attachment],
          
        })
  
      }
      
      }
    }
  
  )



