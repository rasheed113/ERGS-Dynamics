class TranslationValidator {


    validate(master, translation) {


        const missing = [];


        const check = (
            masterObj,
            transObj,
            path = ""
        ) => {


            Object.keys(masterObj).forEach(key => {


                const currentPath =
                    path
                    ? `${path}.${key}`
                    : key;



                if (
                    typeof masterObj[key] === "object"
                    &&
                    !Array.isArray(masterObj[key])
                ) {


                    check(
                        masterObj[key],
                        transObj[key] || {},
                        currentPath
                    );


                } else {


                    if (
                        transObj[key] === undefined
                    ) {

                        missing.push(currentPath);

                    }

                }


            });


        };


        check(
            master,
            translation
        );


        return {

            valid:
                missing.length === 0,

            missingKeys:
                missing

        };

    }


}


export default new TranslationValidator();
