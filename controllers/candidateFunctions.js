import client from "../database/dbconnection.js";

export const personalDetails = async (req, res) => {
//   console.log(req.user);
  const { roll_no, gender, personal_website_link, cgpa, current_degree } =
    req.body;
  try {
    const result = await client.query(
      "INSERT INTO PERSONAL_DEETS VALUES ($1,$2, $3, $4,$5,$6)",
      [
        req.user.user_id,
        roll_no,
        gender,
        personal_website_link,
        cgpa,
        current_degree,
      ]
    );
    res.status(200).send({ data: "Personal Details Inserted Successfully" });
  } catch (err) {
    res.status(400).send({ data: err.message });
  }
};
export const resumeDetails = async (req, res) => {
//   console.log(req.user);
  const { resumeOneName,resumeOneLink, resumeTwoName, resumeTwoLink } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO RESUME_LINKS VALUES ($1,$2,$3)",
      [
        req.user.user_id,resumeOneLink,resumeOneName
      ]
    );
    if(resumeTwoLink && resumeTwoName){
        const result2 = await client.query(
            "INSERT INTO RESUME_LINKS VALUES ($1,$2,$3)",
            [
                req.user.user_id,resumeTwoLink,resumeTwoName
            ]
          );
    }
    res.status(200).send({ data: "Resume Details Inserted Successfully" });
  } catch (err) {
    res.status(400).send({ data: err.message });
  }
};
