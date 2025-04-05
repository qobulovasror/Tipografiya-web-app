import os
from PIL import Image

# rename 
imgs = os.listdir("./")

for i in range(0, len(imgs)):
	if not imgs[i] == "rename.py": 
		os.renames(imgs[i], "img"+str(i+1)+".png")



# compress


#for i in range(0, len(imgs)):
#  if not imgs[i] == "rename.py": 
#    foo = Image.open(imgs[i])
#    print(foo.size)
#     
#    # downsize the image with an ANTIALIAS filter (gives the highest quality)
#    foo = foo.resize((560,307))
     
#    foo.save('imgs'+str(i+1)+'.jpg', optimize=True, quality=95) 