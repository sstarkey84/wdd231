const course = {
    code: "WDD231",
    name: "Web Frontend Development I",
    sections: [
        {
            sectionNum: 1,
            roomNum: "STC 353",
            enrolled: 26,
            days: "TTh",
            instructor: "Bro T"
        },
        {
            sectionNum: 2,
            roomNum: "STC 347",
            enrolled: 28,
            days: "TTh",
            instructor: "Sis A"
        }
    ]
}

course.changeEnrollment = function (sectionNum, add = true) {
    const section = course.sections.find(
        (section) => section.sectionNum === sectionNum);
    if (section) {
        section.enrolled += add ? 1 : -1;
    }
};
export default course;