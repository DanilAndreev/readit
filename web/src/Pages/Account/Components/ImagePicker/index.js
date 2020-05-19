import React from "react";
import useStyles from "./style";
import clsx from "clsx";
import ImageIcon from '@material-ui/icons/Image';
import withWidth, {isWidthUp} from "@material-ui/core/withWidth";


function ImagePicker({
                         onChange = () => {
                         },
                         src,
                         width,
                         date,
                         children,
                         ...props
                     }) {
    const classes = useStyles();


    console.log(date);
    return (
        <>
            <div className={classes.root}>
                <img src={src} className={clsx(classes.img, !src && classes.displayNone)} alt={date}/>
                <ImageIcon className={clsx(classes.imgIcon, src && classes.displayNone)}/>
                <input
                    type={'file'}
                    className={clsx(classes.input)}
                    onChange={event => onChange(event.target.files)}
                    accept={'.png'}
                    multiple={false}
                />
                {children &&
                <div
                    className={clsx(classes.message, isWidthUp('md', width) && classes.displayNone, !src && classes.messageUnloaded)}
                >
                    {children}
                </div>
                }
            </div>
        </>
    );
}

export default withWidth()(ImagePicker);