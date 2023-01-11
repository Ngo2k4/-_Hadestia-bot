module.exports.config = {
    name: "owner",
    version: "1.0.0",
    hasPermision: 0,
    credit: "Joshua Sy",
    description: "get info of owner",
    commandCategory: "info",
    cooldowns: 0,
};

module.exports.run = async function({api, event, args, utils, Users, Threads}) {
    try {
        let axios = require('axios');
        let fs = require("fs-extra");
        let request = require("request");
        let {threadID, senderID, messageID} = event;
	const res = await api.getUserInfoV2(100042801679001); 
   var gender = res.gender == 'male' ? "Male" : res.gender == 'female' ? "Female" : "Not found";
    var birthday = res.birthday == 'Không Có Dữ Liệu' ? "Not found" : "Not Found";
    var love = res.relationship_status == 'Không Có Dữ Liệu' ? "Not found" : "Not Found";
    var location = res.location.name == 'Không Có Dữ Liệu' ? "Not Found" : "Not Found";
    var hometown = res.hometown == 'Không Có Dữ Liệu' ? "Not found" : "Not Found";
  var follow = res.folow == 'Không Có Dữ Liệu' ? "Not Found" : "Not Found";
  var usern = res.username;

	let callback = function() {
            return api.sendMessage({
                body:`•——[OWNER]——•\n\nName: ${res.name}\nFacebook URL: ${res.link}\nBirthday: ${birthday}\nFollowers: ${follow}\nGender: ${gender}\nUID: 100042801679001\nLocation: ${location}\nHometown: ${hometown}\n\n•——[INFORMATION]——•`,
                attachment: fs.createReadStream(__dirname + `/cache/image.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/image.png`), event.messageID);
        };
		return request(encodeURI(res.avatar)).pipe(fs.createWriteStream(__dirname + `/cache/image.png`)).on("close", callback);
		} catch (err) {
        console.log(err)
        return api.sendMessage(`Error`, event.threadID)
    }
}