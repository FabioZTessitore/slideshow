## Auto Start the Desktop

```
$ sudo raspi-config
```

Enable Boot to Desktop
Select Dektop Login as user pi at the Graphical Desktop

## Run a Script after login

```
$ sudo nano /etc/profile
```

Add the following line at the end of the file

```
. /home/pi/script.sh
```
