const { execSQL } = require("../db/mysql");

const getBlogList = (dda) => {
    switch (dda) {
        case 1: {
            const sql = 'SELECT MemberID as ID,ClubName,TeamName,MemberFirstName,MemberLastName,Address1,Address2,City,M.Email,Phone,Birthdate,MembershipStatus,AdminAccess FROM Members M,Clubs C,Teams T where M.ClubID=C.ClubID and M.TeamID=T.TeamID;';
            return execSQL(sql);
        } break;
        case 2: {
            const sql = 'SELECT * FROM `ClubNews` ORDER BY `ClubNews`.`NewsID` ASC;';
            return execSQL(sql);
        } break;
        case 3: {
            const sql = 'SELECT FixtureID,FixtureDate,HomeTeamName,TeamName as AwayTeamName,HomeScore,AwayScore from (SELECT FixtureID,FixtureDate,TeamName as HomeTeamName,AwayTeam,HomeScore,AwayScore FROM Fixtures F,Teams T where F.HomeTeam=T.TeamID) O, Teams T where O.AwayTeam=T.TeamID ORDER BY FixtureID ASC;';
            return execSQL(sql);
        } break;
        case 4: {
            const sql = 'SELECT * FROM Clubs C ORDER BY ClubID ASC;';
            return execSQL(sql);
        } break;
        case 5: {
            const sql = 'SELECT TeamID,TeamName,ClubName,GradeName,GradeMinimumAge,GradeMaximumAge from (SELECT TeamID,TeamName,ClubName,TeamGrade FROM Teams T,Clubs C where T.ClubID=C.ClubID ORDER BY TeamID ASC) O,Grades G where O.TeamGrade=G.GradeID;';
            return execSQL(sql);
        } break;
    }
}

const getBlogMembers = (dda) => {
    let sql = 'SELECT * FROM Teams T,Clubs C,Members M where M.ClubID=C.ClubID and M.TeamID=T.TeamID and M.MemberID=';
    sql += `${dda.ID}` + ';';
    return execSQL(sql);
}

const updatenew = (dda) => {
    // console.log(dda)
    let sql = `UPDATE `
    if (dda.database == 4) {
        sql += `clubnews SET NewsHeader="${dda.NewsHeader}",NewsByline="${dda.NewsByline}",NewsDate="${dda.NewsDate}",News="${dda.News}" WHERE NewsID=${dda.NewsID}`;
    } else if (dda.database == 5) {
        sql += `clubs SET HomeGround="${dda.HomeGround}",ClubAddress="${dda.ClubAddress}",ContactPhone="${dda.ContactPhone}",Email="${dda.Email}" WHERE ClubID=${dda.ClubID}`;
    } else if (dda.database == 6) {
        sql += `teams SET TeamName="${dda.TeamName}" WHERE TeamID=${dda.TeamID}`;
    } else if (dda.database == 7) {
        sql += `members SET MemberFirstName="${dda.MemberFirstName}",MemberLastName="${dda.MemberLastName}",Address1="${dda.Address1}",Address2="${dda.Address2}",City="${dda.City}",Email="${dda.Email}",Phone="${dda.Phone}",Birthdate="${dda.Birthdate}" WHERE MemberID =${dda.ID}`;
    } else if (dda.database == 8) {
        sql += `fixtures SET HomeScore="${dda.HomeScore}",AwayScore="${dda.AwayScore}",FixtureDate="${dda.FixtureDate}" WHERE FixtureID=${dda.FixtureID}`;
    } else {
        sql = '';
    }
    // console.log(sql)
    return execSQL(sql);
}

const createNew = (dda) => {
    console.log(dda)
    // let sql = `INSERT INTO `
    if (dda.database == 4) {
        sql += `clubnews (ClubID,NewsHeader,NewsByline,NewsDate,News) VALUES (23,"${dda.NewsHeader}","${dda.NewsByline}","${dda.NewsDate}","${dda.News}")`;
    } else if (dda.database == 5) {
        sql += `clubs (ClubName,HomeGround,ClubAddress,ContactPhone,Email) VALUES ("${dda.ClubName}","${dda.HomeGround}","${dda.ClubAddress}","${dda.ContactPhone}","${dda.Email}")`;
    } else if (dda.database == 6) {
        sql += `teams (ClubID,TeamName,TeamGrade) VALUES (23,"${dda.TeamName}",5)`;
    } else if (dda.database == 7) {
        sql += `members (ClubID,TeamID,MemberFirstName,MemberLastName,Address1,Address2,City,Email,Phone,Birthdate) VALUES (23,,123,"${dda.MemberFirstName}","${dda.MemberLastName}","${dda.Address1}","${dda.Address2}","${dda.City}","${dda.Email}","${dda.Phone}","${dda.Birthdate}")`;
    } else if (dda.database == 8) {
        sql += `fixtures (FixtureDate,HomeTeam,AwayTeam,HomeScore,AwayScore) VALUES (23,"${dda.FixtureDate}","${dda.HomeTeam}","${dda.AwayTeam}","${dda.HomeScore}","${dda.AwayScore}")`;
    } else {
        sql = '';
    }
    // console.log(sql)
    return execSQL(sql);
}
const updateBlog = (dda) => {
    let sql = 'UPDATE Members SET '
    sql += `MemberFirstName='${dda.MemberFirstName}'` + ', ';
    sql += `MemberLastName='${dda.MemberLastName}'` + ', ';
    sql += `Birthdate='${dda.Birthdate}'` + ', ';
    sql += `Phone='${dda.Phone}'` + ', ';
    sql += `Email='${dda.Email}'` + ', ';
    sql += `City='${dda.City}'` + ', ';
    sql += `Address2='${dda.Address2}'` + ', ';
    sql += `Address1='${dda.Address1}'` + ' ';
    sql += `WHERE MemberID='${dda.MemberID}'` + ';';
    return execSQL(sql);
}
const deleteBlog = (id, database) => {
    let sql = 'DELETE FROM '
    if (database == 4) {
        sql += `clubnews WHERE NewsID=${id}`;
    } else if (database == 5) {
        sql += `clubs WHERE ClubID=${id}`;
    } else if (database == 6) {
        sql += `teams WHERE TeamID=${id}`;
    } else if (database == 7) {
        sql += `members WHERE MemberID=${id}`;
    } else if (database == 8) {
        sql += `fixtures WHERE FixtureID=${id}`;
    } else {
        sql = '';
    }
    return execSQL(sql);
}
module.exports = {
    getBlogList,
    getBlogMembers,
    updatenew,
    createNew,
    updateBlog,
    deleteBlog
}